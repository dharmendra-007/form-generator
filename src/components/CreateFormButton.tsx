"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Loader } from "lucide-react";
import { toast } from "sonner";
import { FilePlus2 } from "lucide-react";

import { formSchema } from "@/schemas/CreateFormSchema";
import { formSchemaType } from "@/schemas/CreateFormSchema";
import { useAuth } from "@/hooks/useAuth";
import API from "@/lib/axios";
import { FormElementInstance } from "@/types/formElementType";

type form = formSchemaType & {
  id: string;
  userId: string;
  createdAt: string;
  publishd: boolean;
  content: FormElementInstance[];
  visits: number;
  submissions: number;
  shareUrl: string;
};

function CreateFormButton({
  onFormCreated,
  userId,
}: {
  onFormCreated: (form: form) => void;
  userId: string;
}) {
  const { isAuthenticated, token } = useAuth();
  const router = useRouter();

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: formSchemaType) => {
    if (!isAuthenticated) {
      toast.error("Authentication Required", {
        description: "Please sign in to create forms",
      });
      router.push("/");
      return;
    }

    API.post(
      "/api/v1/form/create",
      {
        userId,
        name: values.name.trim(),
        description: values.description?.trim(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    )
      .then((res) => {
        const data = res.data;
        toast.success("Success", {
          description: "Form Created Successfully",
        });
        form.reset();
        if (onFormCreated) onFormCreated(data.form);
      })
      .catch((err) => {
        const message = err.response?.data?.message || "An error occured";
        toast.error("Error", {
          description: message,
        });
      });
  };

  const handleClick = () => {
    if (!isAuthenticated) {
      toast.error("Authentication Required", {
        description: "Please sign in to create forms",
      });
      router.push("/");
      return;
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="group h-full min-h-[190px] items-center justify-center flex flex-col hover:cursor-pointer gap-4 bg-background"
            onClick={handleClick}
          >
            <FilePlus2 className="!h-8 !w-8 text-muted-foreground group-hover:text-primary" />
            <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
              Create new form
            </p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Your Own Form</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&aposre
              done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label>name</Label>
                    <FormControl>
                      <Input placeholder="Enter a name" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label>description</Label>
                    <FormControl>
                      <Textarea
                        placeholder="Give a description"
                        rows={10}
                        className=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateFormButton;
