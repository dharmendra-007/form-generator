import { SubmitPageWrapper } from "@/components/pages/submitPage";

async function SubmitPage({ params }: {
  params: Promise<{ formURL: string }>
}
) {
  const {formURL} = await params

  return (
    <SubmitPageWrapper formUrl={formURL}/>
  );
}

export default SubmitPage;
