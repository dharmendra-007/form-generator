import FormBuilder from '@/components/FormBuilder'
import React from 'react'
// import VisitBtn from '@/components/VisitBtn';
// import FormLinkShare from '@/components/formLinkShare';
import { formatDistance } from 'date-fns';

function BuilderPage({params}:{params:{
  id: string
}}) {
  // throw new Error("test")
  const form = {
    "_id": "d059d63a-d4a7-4716-8211-34d2a3ba549f",
    "name": "Zaam-Dox",
    "description": "Savory wraps with buffalo chicken and fresh vegetables.",
    "published": false,
    "createdAt": "5/21/2024",
    "visits": 266,
    "submissions": 280
  }

  return (
    <div>
      <div>
    {/* <div className="py-10 border-b border-muted">
      <div className="flex justify-between container">
        <h1 className="text-4xl font-bold truncate">{form.name}</h1>
        <VisitBtn shareUrl={form.shareURL} />
      </div>
    </div>

    <div className="py-4 border-b border-muted">
      <div className="container flex gap-2 items-center justify-between">
        <FormLinkShare shareUrl={form.shareURL} />
      </div>
    </div> */}
  </div>
      <FormBuilder form={form}/>
    </div>
  )
}

export default BuilderPage

type Row = {[key: string] : string} & {
  submittedAt: Date;
};

async function SubmissionsTable({id}:{id:number}

){
  const form = await GetFormWithSubmissions(id)
 if (!form) {
    throw new Error("form not found");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];
  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });
const rows: Row[] =[];
//forms.FormsSubmission.forEach({submission})=> {
//   const content =JSON.parse(SubmissionsTable.content);
//   rows.push({
//     ...content
//   })
// }

return (
  <>
    <h1 className="text-2xl mb-4">Submissions</h1>
    <div className="rounded-md border overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.id} className="text-left p-2 uppercase font-semibold">
                {column.label}
              </th>
            ))}
            <th className="text-right p-2 text-muted-foreground uppercase">
              Submitted at
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-t">
              {columns.map((column) => (
                <td key={column.id} className="p-2">
                  {row[column.id]}
                </td>
              ))}
              <td className="p-2 text-right text-muted-foreground">
                {formatDistance(new Date(row.submittedAt), new Date(), {
                  addSuffix: true,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

}



// function RowCell({ type, value }: { type: ElementsType; value: string }) {
//   let node: ReactNode = value;
//   return <td>{node}</td>;
// }