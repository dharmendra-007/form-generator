"use client";

import { useAuth } from "@/hooks/useAuth";
import API from "@/lib/axios";
import { ElementsType, FormElementInstance } from "@/types/formElementType";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { formatDistance } from "date-fns";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Button } from "./ui/button";
import { FileSpreadsheet, Sheet } from "lucide-react";

type FormSubmissionType = {
  id: string;
  createdAt: string;
  formId: string;
  content: Record<string, string>;
  userId: string;
};

export function SubmissionsTable({ id }: { id: string }) {
  const [formContent, setFormContent] = useState<FormElementInstance[]>([]);
  const [submissions, setSubmissions] = useState<FormSubmissionType[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    API.get(`/api/v1/form/getFormWithSubmissions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        const contentString = res.data?.content?.content || "[]";
        setFormContent(JSON.parse(contentString));
        setSubmissions(res.data?.content?.formSubmissions || []);
      })
      .catch((error) => {
        const message = error?.response?.data?.message || "Something went wrong";
        toast.error("Failed to fetch form", { description: message });
      });
  }, [id, token]);

  const columns: { id: string; label: string; required: boolean; type: ElementsType }[] = [];

  if (Array.isArray(formContent)) {
    formContent.forEach((element) => {
      if (
        [
          "TextField",
          "NumberField",
          "TextAreaField",
          "SelectField",
          "CheckboxField",
          "EmailField",
          "RadioButtonField",
        ].includes(element.type)
      ) {
        columns.push({
          id: element.id,
          label: (element.extraAttributes?.label as string) || "",
          required: !!element.extraAttributes?.required,
          type: element.type,
        });
      }
    });
  }


  // -----------------------------
  // CSV Download
  // -----------------------------
  const downloadCSV = () => {
    if (!submissions.length) return;

    // Prepare headers
    const headers = ["Id", ...columns.map(c => c.label), "Submitted At"];
    // Prepare rows
    const rows = submissions.map(s => [
      s.id,
      ...columns.map(c => s.content[c.id] || ""),
      s.createdAt
    ]);

    const csvContent = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `submissions.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // -----------------------------
  // Excel Download
  // -----------------------------
  const downloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Submissions");

    // Add headers
    const headers = ["Id", ...columns.map(c => c.label), "Submitted At"];
    sheet.addRow(headers);

    // Add data
    submissions.forEach(s => {
      const row = [s.id, ...columns.map(c => s.content[c.id] || ""), s.createdAt];
      sheet.addRow(row);
    });

    // Write to buffer
    const buf = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buf]), "submissions.xlsx");
  };

  return (
    <div className="mt-5">
      <div className="relative text-center my-8">
        <span className="text-4xl font-bold text-white bg-black px-4 relative z-10">
          Submissions
        </span>
        <div className="absolute top-1/2 left-0 w-full border-t border-green-700 z-0" />
      </div>
      {submissions.length > 0 ? <>
        <div className="flex justify-end w-full gap-2 my-2">
          <Button onClick={downloadCSV} className="cursor-pointer">
            Download CSV <FileSpreadsheet />
          </Button>
          <Button onClick={downloadExcel} className="cursor-pointer">Download Excel <Sheet /></Button>
        </div>
        <Table className="mt-5">
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              {columns.map((column) => (
                <TableHead key={column.id}>{column.label} <span className="text-white/50">{column.required ? "(req)" : ""}</span></TableHead>
              ))}
              <TableHead>Submitted At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>{submission.id || "-"}</TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id}>{submission.content[column.id] || "-"}</TableCell>
                ))}
                <TableCell>{formatDistance(submission.createdAt, new Date(), { addSuffix: true }) || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </> : <div className="w-full text-xl font-medium h-24 flex justify-center items-center">No submissions yet...</div>}
    </div>
  );
}