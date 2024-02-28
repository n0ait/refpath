"use client";
 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
 
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { QuestionSchema } from "@/schemas/training/QuestionSchema";

interface QuestionPropositionProps {
  propositions: PropositionProps[],
  questionId: string
}

interface PropositionProps {
  id: string
  name: string | null
}

export const QuestionProposition = ({
  propositions,
  questionId
} : QuestionPropositionProps) => {

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      items: [""],
    },
  })

  function onSubmit(data: z.infer<typeof QuestionSchema>) {
    console.log("answers: ", data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              {propositions.map((proposition) => (
                <FormField
                  key={proposition.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={proposition.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(proposition.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, proposition.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== proposition.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {proposition.name}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Valider</Button>
      </form>
    </Form>
  )
}