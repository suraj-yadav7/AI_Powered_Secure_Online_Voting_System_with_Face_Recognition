import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/utils/endpointUrls";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const form = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone:"",
      password:"",
      gender: "",
    },
  });
  const navigate = useNavigate()

  const onSubmit = async(data) => {
    try{
      const response = await axios.post(api.signup, data)
      console.log("response: ", response)
      const {success, message} = response.data

      if(success){
        toast.success(message)
        form.reset()
        setTimeout(()=>{
          navigate("/login")
        }, 1000)
      };
    }catch(error){
      console.log("Error occured while signup user: ", error)
      toast.error(error.response?.data?.message || error.message)
    }
  };

  return (
    <>
    <div className="  bg-slate-50  dark:bg-transparent">
      <div className="text-center py-3 ">
        <h4 className="text-xl text-center font-bold">Signup Form</h4>
      </div>
      <div className="max-w-md mx-auto p-6 border rounded-xl shadow bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="first_name"
              rules={{required:"First name is required."}}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              rules={{required:"Last name is required."}}
              render = {({field}) =>(
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Last Name" {...field}/>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              rules={{required:"phone number is required"}}
              render = {({field}) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="+91XXXXXXXXX" {...field}/>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender - Select */}
            <FormField
              control={form.control}
              name="gender"
              rules={{ required: "Please select a gender" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button type="submit" className="w-full cursor-pointer">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      </div>
    </>
  );
};