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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageFileUploader from '../custom/ui/imageFileUploader';
import { fileToBase64, useConstantUtils } from '@/mock/constant';
import { useToast } from '@/utils/useToast';
import { reverseGeocode } from '@/hooks/helpers/getGeoLocation';
import { useSubmitClaims } from '@/hooks/useSubmitClaims';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Card } from "../ui/card"
import { PlusCircle, User } from "lucide-react"
import { Button } from "../ui/button"
import Loading from '@/context/loading';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const submitClaimSchema = z.object({
    title: z.string().min(1, "title is required"),
    description: z.string().min(1, "Description must be at least 8 characters"),
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

export function SubmitClaimModal() {
    //   const [selectedState, setSelectedState] = useState<string | undefined>(undefined);
    //   const [open, setOpen] = useState(false)
    //   const [selectedCareer, setSelectedCareer] = useState("")
    const [gettingLocation, setGettingLocation] = useState(false)
    const { currentUserID } = useConstantUtils()


    const { errorToast } = useToast();
    const { submitClaim, isSubmitClaimPending } = useSubmitClaims()

    const submitClaimForm = useForm<SubmitClaimForm>({
        resolver: zodResolver(submitClaimSchema),
        defaultValues: {
            title: "",
            description: "",
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
            userId: currentUserID,
            ...formData,
            attachments: attachmentsBase64,
        };
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                setGettingLocation(true)
                const location = await reverseGeocode(pos.coords.latitude, pos.coords.longitude)

                const dataWithLocation = {
                    ...payload,
                    location: location
                }
                setGettingLocation(false)
                const stringifyFormData = JSON.stringify(dataWithLocation)
                // console.log(stringifyFormData)

                return await submitClaim({ data: stringifyFormData })
            },
            async (err) => {
                errorToast("Failed to get location please allow")
                return err
            }
        );
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Card className="p-4 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                            <Button
                                variant="outline"
                                className="w-full justify-start text-muted-foreground hover:bg-muted rounded-full"
                            >
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Submit a claim for verification...
                            </Button>
                        </div>
                    </div>
                </Card>
            </AlertDialogTrigger>
            <AlertDialogContent className="!max-w-3xl w-full">
                <div className="max-h-[80vh] overflow-y-auto pr-2 w-full">
                    <AlertDialogHeader className='mb-2'>
                        <AlertDialogTitle> <span className="text-4xl font-bold tracking-tight">Submit a Claim</span>
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            <span className="text-lg text-muted-foreground">
                                Help us share information circulating in your community
                            </span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className='!justify-normal !flex-col'>
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

                                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                </div> */}

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

                                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                </div> */}

                                {/* <FormField
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
                                /> */}

                                <div className="flex gap-4">
                                    <Button disabled={isSubmitClaimPending} type="submit" onClick={submitClaimForm.handleSubmit(handleSubmit)} size="lg" className="flex-1">
                                        Submit Claim
                                    </Button>
                                    <AlertDialogCancel type="button">
                                        Cancel
                                    </AlertDialogCancel>
                                </div>
                            </div>
                        </Form>
                        <Loading openDialog={gettingLocation} />

                    </AlertDialogFooter>
                </div>

            </AlertDialogContent>
        </AlertDialog>
    )
}
