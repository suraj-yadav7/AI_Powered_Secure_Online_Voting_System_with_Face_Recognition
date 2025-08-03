import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectValue, SelectContent, SelectItem, SelectTrigger, SelectGroup, SelectLabel } from "@/components/ui/select";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/utils/endpointUrls"
import { useState } from "react"

const Voter = () => {
  const [voterData, setVoterData] = useState({
    first_name:"",
    last_name:"",
    date_of_birth:"",
    gender:"",
    phone:"",
    aadhar_number:"",
    email:"",
    constituency:"",
    occupation:"",
    highest_qualification:""
  })

  const [addressData, setAddressData] = useState({
    house_no:"",
    locality:"",
    landmark:"",
    mandal:"",
    district:"",
    city:"",
    state:"",
    pincode:""
  })

  console.log("VoterData: ", voterData)
  console.log("addressData: ", addressData)

  const handleChangeVoterData = (e) =>{
    const {value, name} = e.target
    setVoterData((prev) => ({...prev, [name] : value}))
  };

  const handleChangeAddressData = (e) => {
    const {value, name} = e.target
    setAddressData((prev) => ({...prev, [name] : value}))
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      console.log("final data: ", {voterData, addressData})
      const response = await axios.post(api.voter_register, {...voterData, address:addressData})
      const {data} = response
      if(!data){
        toast.error("No valid response")
      };
      toast.success(data.message)
    }catch(error){
      console.log("Error occured while voter registration: ", error)
    }
  };


  return (
    <>
      <div className="w-full flex justify-center items-center">
        <Card className="flex justify-center items-center overflow-hidden p-1 w-[50%] ">
          <h1 className="text-2xl font-bold pt-4">Voter Registration Form</h1>
          <CardContent className=" border rounded-2xl w-[60%] mb-4">
              <form className="p-2 " onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" type="text" name="first_name" value={voterData.first_name}  required     onChange={handleChangeVoterData}/>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" type="text" name="last_name" value={voterData.last_name} required onChange={handleChangeVoterData}/>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="dob">Date Of Birth</Label>
                  <Input id="dob" type="date" name="date_of_birth" value={voterData.date_of_birth}   placeholder="D.O.B" required    onChange={handleChangeVoterData}/>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Gender</Label>
                  <Select  onValueChange = {(value) => handleChangeVoterData({target:{name:"gender", value}})} >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Your Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem name="gender"   value="female">Female</SelectItem>
                      <SelectItem name="gender"  value="male">Male</SelectItem>
                      <SelectItem name="gender"  value="other">other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="text" name="phone" value={voterData.phone}  placeholder="+91XXXXXXXXX" required    onChange={handleChangeVoterData}/>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="aadhar">Aadhar Number</Label>
                  <Input id="aadhar" type="number" name="aadhar_number" value={voterData.aadhar_number}   placeholder="12 Digit" required
                  onChange={handleChangeVoterData}/>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" name="email" value={voterData.email} placeholder="john@example.com" required  onChange={handleChangeVoterData}/>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="occupation">occupation</Label>
                  <Input id="occupation" type="text" name="occupation" value={voterData.occupation}   placeholder="" required  onChange={handleChangeVoterData}/>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="qualification">highest_qualification</Label>
                  <Input id="qualification" type="text" name="highest_qualification" value={voterData.highest_qualification}   placeholder="" required
                  onChange={handleChangeVoterData}/>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="constituency">constituency</Label>
                  <Input id="constituency" type="text" name="constituency" value={voterData.constituency}   placeholder="" required
                  onChange={handleChangeVoterData}/>
                </div>

                {/* Address */}
                <div>
                  <Label className="pb-4">Address</Label>
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 pb-4 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="house_no">House No</Label>
                      <Input
                        id="house_no"
                        name="house_no"
                        value={addressData.house_no}
                        onChange={handleChangeAddressData}
                        placeholder="Enter house number"
                        required
                      />
                    </div>
                    <div className=" w-xs md:w-3xs">
                      <Label htmlFor="locality">Locality</Label>
                      <Input
                        id="locality"
                        name="locality"
                        value={addressData.locality}
                        onChange={handleChangeAddressData}
                        placeholder="Enter locality"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 pb-4 md:grid-cols-3 gap-4">
                      <div>
                      <Label htmlFor="landmark">Landmark</Label>
                      <Input
                        id="landmark"
                        name="landmark"
                        value={addressData.landmark}
                        onChange={handleChangeAddressData}
                        placeholder="Enter landmark"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mandal">Mandal</Label>
                      <Input
                        id="mandal"
                        name="mandal"
                        value={addressData.mandal}
                        onChange={handleChangeAddressData}
                        placeholder="Enter mandal"
                      />
                    </div>
                    <div>
                      <Label htmlFor="district">District</Label>
                      <Input
                        id="district"
                        name="district"
                        value={addressData.district}
                        onChange={handleChangeAddressData}
                        placeholder="Enter district"
                      />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={addressData.city}
                        onChange={handleChangeAddressData}
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={addressData.state}
                        onChange={handleChangeAddressData}
                        placeholder="Enter state"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        type="number"
                        value={addressData.pincode}
                        onChange={handleChangeAddressData}
                        placeholder="Enter pincode"
                      />
                    </div>

                  </div>
                </div>
                <Button type="submit" className="w-full cursor-pointer">
                  Register
                </Button>
              </div>
            </form>
          </CardContent>
      </Card>
      </div>
    </>
  )
};

export default Voter