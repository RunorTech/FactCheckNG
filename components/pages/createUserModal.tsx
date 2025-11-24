"use client";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Link } from "lucide-react"
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
import { careers, useConstantUtils } from '@/mock/constant';
import { useToast } from '@/utils/useToast';
import { reverseGeocode } from '@/hooks/helpers/getGeoLocation';
import {
    AlertDialog,
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
import { useCreateUser } from '@/hooks/useCreateUser';
import { getDeviceInfo } from '@/hooks/helpers/getDeviceInfo';
import { useDispatch } from 'react-redux';
import { setCurrentUserID } from '@/utils/store/redux/slices/shared.slice';

const createUserSchema = z.object({
    firstName: z.string().min(1, "first name is required").max(255),
    lastName: z.string().min(1, "last name is required").max(255),
    career: z.string().min(1, "Career is required").max(255),

})

type CreateUserForm = z.infer<typeof createUserSchema>;

export function CreateUserModal() {
    const [open, setOpen] = useState(false)
    const [selectedCareer, setSelectedCareer] = useState("")
    const [gettingLocation, setGettingLocation] = useState(false)
    const { hasProfile } = useConstantUtils()
    const reduxDispatch = useDispatch();


    const { errorToast } = useToast();
    const { createUser, isCreateUserPending } = useCreateUser()
    const deviceInfo = getDeviceInfo()
    const userId = crypto.randomUUID()



    const CreateUserForm = useForm<CreateUserForm>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            career: "",
        }
    });
    const handleSubmit = async (data: CreateUserForm) => {
        
        reduxDispatch(setCurrentUserID(userId));
        const stringifyData = JSON.stringify(deviceInfo)


        const { ...formData } = data
        const payload = {
            userId,
            ...formData,
            deviceInfo: stringifyData
        };
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                setGettingLocation(true)
                const location = await reverseGeocode(pos.coords.latitude, pos.coords.longitude)

                const dataWithLocation = {
                    ...payload,
                    location: JSON.stringify(location)
                }
                setGettingLocation(false)
                const stringifyFormData = JSON.stringify(dataWithLocation)
                // console.log(stringifyFormData)

                return await createUser({ data: stringifyFormData })
            },
            async (err) => {
                errorToast("Failed to get location please allow")
                return err
            }
        );
    };
    return (
        <AlertDialog open={!hasProfile}>
            <AlertDialogContent className="!max-w-3xl w-full">
                <div className="max-h-[80vh] overflow-y-auto pr-2 w-full">
                    <AlertDialogHeader className='mb-2'>
                        <AlertDialogTitle> <span className="text-4xl font-bold tracking-tight">Create your Profile</span>
                        </AlertDialogTitle>
                        <AlertDialogDescription>

                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className='!justify-normal !flex-col'>
                        <Form {...CreateUserForm} >
                            <div className="space-y-6">


                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={CreateUserForm.control}
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
                                        control={CreateUserForm.control}
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
                                    control={CreateUserForm.control}
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
                                <p className="text-sm mb-3 text-muted-foreground flex items-center space-x-2">
                                    <span>By submitting you agree to our user policy</span> <span><Link className='w-3 h-3' /></span>
                                </p>

                                <div className="flex gap-4">
                                    <Button disabled={isCreateUserPending} type="submit" onClick={CreateUserForm.handleSubmit(handleSubmit)} size="lg" className="flex-1">
                                        Create profile
                                    </Button>
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
