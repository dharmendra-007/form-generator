"use client";

import type React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { formSchemaType } from "@/schemas/CreateFormSchema";
import { Badge } from "./ui/badge";
import { formatDistance } from "date-fns";
import { View, FileMinus, ArrowRight, SquarePen, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import type { FormElementInstance } from "@/types/formElementType";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./ui/alert-dialog";

// Type guard for AxiosError with response.data.message
function isAxiosErrorWithMessage(
  err: unknown
): err is { response: { data: { message: string } } } {
  return (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as { response?: unknown }).response === "object" &&
    (err as { response: { data?: unknown } }).response !== null &&
    "data" in (err as { response: { data?: unknown } }).response &&
    typeof (err as { response: { data: { message?: unknown } } }).response
      .data === "object" &&
    (err as { response: { data: { message?: unknown } } }).response.data !==
      null &&
    "message" in
      (err as { response: { data: { message?: unknown } } }).response.data &&
    typeof (err as { response: { data: { message?: unknown } } }).response.data
      .message === "string"
  );
}

function isErrorWithMessage(err: unknown): err is { message: string } {
  return (
    typeof err === "object" &&
    err !== null &&
    "message" in err &&
    typeof (err as { message?: unknown }).message === "string"
  );
}

function FormCard({
  form,
  onDelete,
}: {
  form: formSchemaType & {
    id: string;
    userId: string;
    createdAt: string;
    published: boolean;
    content: FormElementInstance[];
    visits: number;
    submissions: number;
    shareUrl: string;
  };
  onDelete: (id: string) => void;
}) {
  const { isAuthenticated, token } = useAuth();
  const router = useRouter();

  const handleAction = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      toast.error("Authentication Required", {
        description: "Please sign in to view or edit forms",
      });
      router.push("/");
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-border/50 hover:border-border flex flex-col h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-start justify-between gap-3">
          <span className="truncate font-semibold text-lg leading-tight">
            {form.name}
          </span>
          <Badge
            variant={form.published ? "default" : "secondary"}
            className={`shrink-0 ${
              form.published
                ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400"
                : "bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400"
            }`}
          >
            {form.published ? "Published" : "Draft"}
          </Badge>
        </CardTitle>
        <CardDescription className="space-y-2">
          <div className="text-sm text-muted-foreground">
            Created{" "}
            {formatDistance(form.createdAt, new Date(), {
              addSuffix: true,
            })}
          </div>
          {form.published && (
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <View className="h-4 w-4" />
                <span className="font-medium">
                  {form.visits.toLocaleString()}
                </span>
                <span className="text-xs">views</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <FileMinus className="h-4 w-4" />
                <span className="font-medium">
                  {form.submissions.toLocaleString()}
                </span>
                <span className="text-xs">submissions</span>
              </div>
            </div>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {form.description || "No description provided"}
        </p>
      </CardContent>

      <CardFooter className="pt-0">
        {form.published ? (
          <Button
            asChild
            className="w-full group-hover:shadow-sm transition-all duration-200"
            onClick={handleAction}
          >
            <Link
              href={`/form/${form.id}`}
              className="flex items-center justify-center gap-2"
            >
              View submissions
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        ) : (
          <div className="flex gap-2 w-full">
            <Button
              asChild
              variant="outline"
              className="flex-1 group-hover:shadow-sm transition-all duration-200"
              onClick={handleAction}
            >
              <Link
                href={`/builder/${form.id}`}
                className="flex items-center justify-center gap-2"
              >
                <SquarePen className="h-4 w-4" />
                Edit form
              </Link>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 text-destructive hover:text-destructive-foreground hover:bg-destructive transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete form</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this form?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your form and all its data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-white hover:bg-destructive/90"
                    onClick={async (e) => {
                      e.preventDefault();
                      if (!isAuthenticated) {
                        toast.error("Authentication Required", {
                          description: "Please sign in to delete forms",
                        });
                        router.push("/");
                        return;
                      }
                      try {
                        await (
                          await import("@/lib/axios")
                        ).default.delete(`/api/v1/form/delete/${form.id}`, {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        });
                        toast.success("Form deleted successfully");
                        onDelete(form.id);
                      } catch (err: unknown) {
                        let message = "Unknown error";
                        if (isAxiosErrorWithMessage(err)) {
                          message = err.response.data.message;
                        } else if (isErrorWithMessage(err)) {
                          message = err.message;
                        }
                        toast.error("Failed to delete form", {
                          description: message,
                        });
                      }
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default FormCard;
