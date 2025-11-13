"use client";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { stateLGAs } from './state_lga';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageFileUploader from '../custom/ui/imageFileUploader';
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { careers, fileToBase64 } from '@/mock/constant';



const MAX_FILE_SIZE = 5 * 1024 * 1024;
const submitClaimSchema = z.object({
  firstName: z.string().min(1, "first name is required").max(255),
  lastName: z.string().min(1, "last name is required").max(255),
  career: z.string().min(1, "Career is required").max(255),
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "Description must be at least 8 characters"),
  state: z.string().min(1, "state  is required").max(100),
  lga: z.string().min(1, "lga is required").max(100,),
  category: z.string().min(1, "category is required").max(100,),
  attachments: z
    .any()
    .optional()
    .refine((val) => val === undefined || val instanceof File, {
      message: "Please upload a valid image file",
    })
    .refine(
      (file) => file === undefined || file.size <= MAX_FILE_SIZE,
      { message: "File size must be less than 5MB" }
    ),
  anonymous: z.boolean(),

})

type SubmitClaimForm = z.infer<typeof submitClaimSchema>;

const SubmitClaimsPage = () => {
  const [selectedState, setSelectedState] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false)
  const [selectedCareer, setSelectedCareer] = useState("")

  const submitClaimForm = useForm<SubmitClaimForm>({
    resolver: zodResolver(submitClaimSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      career: "",
      title: "",
      description: "",
      state: "",
      lga: "",
      category: "",
      attachments: "",
      anonymous: false
    }
  });
  const handleSubmit = async (data: SubmitClaimForm) => {
    const { attachments, ...formData } = data
    let attachmentsBase64 = "";

    if (attachments instanceof File) {
      attachmentsBase64 = await fileToBase64(attachments);
    }
    const payload = {
      ...formData,
      attachments: attachmentsBase64,
    };
    const response = navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const dataWithLocation = {
          ...payload,
          ...pos
        }
        const res = await fetch('/api/claims', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataWithLocation),
        })
        return res
      },
      async (err) => {
        // const res = await fetch('/api/claims', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(payload),
        // })
        console.info(err)
        return 
      }
    );
    console.log(response)
  };



  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          <div className="space-y-2 mb-8">
            <h1 className="text-4xl font-bold tracking-tight">Submit a Claim</h1>
            <p className="text-lg text-muted-foreground">
              Help us verify information circulating in your community
            </p>
          </div>

          <Form {...submitClaimForm} >
            <div className="space-y-6">
              <FormField
                control={submitClaimForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor='title'>Claim Title *</FormLabel>
                    <FormControl>
                      <Input
                        id="title"
                        placeholder="Enter a brief summary of the claim"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={submitClaimForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor='description'>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        id="description"
                        placeholder="Provide more details about where you heard this claim and why it needs verification"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={submitClaimForm.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor='state'>State *</FormLabel>
                      <FormControl>
                        <Select {...field} onValueChange={(value) => {
                          field.onChange(value)
                          setSelectedState(value)
                        }}>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(stateLGAs).map((state) => (
                              <SelectItem key={state} value={state}>
                                {state.charAt(0).toUpperCase() + state.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={submitClaimForm.control}
                  name="lga"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor='lga'>Local Government Area *</FormLabel>
                      <FormControl>
                        <Select {...field} onValueChange={field.onChange} disabled={!selectedState} >
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder={selectedState ? "Select LGA" : "Select a state first"} />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedState &&
                              stateLGAs[selectedState].map((lga) => (
                                <SelectItem key={lga} value={lga.toLowerCase().replace(/\s/g, "-")}>
                                  {lga}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={submitClaimForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor='category'>Category *</FormLabel>
                    <FormControl>
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Health">Health</SelectItem>
                          <SelectItem value="Politics">Politics</SelectItem>
                          <SelectItem value="Economy">Economy</SelectItem>
                          <SelectItem value="Security">Security</SelectItem>
                          <SelectItem value="Others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={submitClaimForm.control}
                name="attachments"
                render={({ field: { onChange, value } }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor='attachments'>Upload Attachments (Optional)</FormLabel>
                    <FormControl>
                      <ImageFileUploader value={value}
                        onChange={onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={submitClaimForm.control}
                name="anonymous"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel htmlFor='anonymous'>Submit Anonymously</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Your identity will not be shared publicly
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        id="anonymous"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={submitClaimForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor='firstName'>First Name *</FormLabel>
                      <FormControl>
                        <Input
                          id="firstName"
                          placeholder="Enter First Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={submitClaimForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor='lastName'>Last Name *</FormLabel>
                      <FormControl>
                        <Input
                          id="lastName"
                          placeholder="Enter Last Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={submitClaimForm.control}
                name="career"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor="career">Career *</FormLabel>
                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                          >
                            {selectedCareer
                              ? selectedCareer
                              : "Select or search for your career"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search career..." />
                            <CommandList>
                              <CommandEmpty>No careers found.</CommandEmpty>
                              <CommandGroup>
                                {careers.map((career) => (
                                  <CommandItem
                                    key={career}
                                    value={career}
                                    onSelect={(value) => {
                                      setSelectedCareer(value)
                                      field.onChange(value)
                                      setOpen(false)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === career ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    {career}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button type="submit" onClick={submitClaimForm.handleSubmit(handleSubmit)} size="lg" className="flex-1">
                  Submit Claim
                </Button>
                <Button type="button" variant="outline" size="lg">
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </main>

    </div>
  );
};

export default SubmitClaimsPage;
