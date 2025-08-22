import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { View, FileMinus, SquarePen, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import API from "@/lib/axios";
import { formType } from "@/types/formType";

type FormCardProps = {
  form: formType
  onDelete: (id: string) => void;
};

export function FormCard({ form, onDelete }: FormCardProps) {
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

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Authentication Required", {
        description: "Please sign in to delete forms",
      });
      router.push("/");
      return;
    }

    API.delete(`/api/v1/form/delete/${form.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(() => {
        toast.success("Form deleted successfully");
        onDelete(form.id);
      })
      .catch((error) => {
        const message = error.response.data.message || "Something went wrong"
        toast.error("Failed to delete form", {
          description: message,
        });
      })
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
            className={`shrink-0 ${form.published
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

      <CardFooter className="pt-0 flex gap-2">
        {form.published ? (
          <Button
            asChild
            className="flex-1 group-hover:shadow-sm transition-all duration-200"
            onClick={handleAction}
          >
            <Link
              href={`/forms/${form.id}`}
              className="flex items-center justify-center gap-2"
            >
              View submissions
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        ) : (
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
        )}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 text-destructive hover:text-destructive-foreground hover:bg-destructive transition-colors duration-200 cursor-pointer"
            >
              <Trash2 className="h-4 w-4 cursor-pointer" />
              <span className="sr-only">Delete form</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this form?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your form and all its data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-white hover:bg-destructive/90 cursor-pointer"
                onClick={handleDelete}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}