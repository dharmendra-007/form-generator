import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { formSchemaType } from "@/schemas/CreateFormSchema";
import { Badge } from "./ui/badge";
import { formatDistance } from "date-fns";
import { View } from 'lucide-react';
import { FileMinus } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { SquarePen } from 'lucide-react';
import { Button } from "./ui/button";
import Link from "next/link";

function FormCard({ form }: {
  form: formSchemaType & {
    _id : string
    published: boolean,
    createdAt: string,
    visits: number,
    submissions: number
  }
}) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="truncate font-bold max-w-[70%]">{form.name}</span>
          {form.published && <Badge variant="success">Published</Badge>}
          {!form.published && <Badge variant="destructive">Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex flex-col gap-3">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true
          })}
          {form.published && <span className="flex items-center text-muted-foreground gap-2">
            <View className="!h-5" />
            <span>{form.visits}</span>
            <FileMinus className="!h-5" />
            <span>{form.submissions}</span>
          </span>}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] text-sm text-muted-foreground truncate">
        {form.description || "No description"}
      </CardContent>
      <CardFooter className="">
        {form.published && (<Button asChild className="w-full mt-2 text-base">
          <Link href={`/form/${form._id}`}>View submissions<ArrowRight />
          </Link>
          </Button>)}
        {!form.published && (<Button asChild variant="secondary" className="w-full mt-2 text-base">
          <Link href={`/builder/${form._id}`}>Edit form<SquarePen/>
          </Link>
          </Button>)}
      </CardFooter>
    </Card>
  )
}

export default FormCard