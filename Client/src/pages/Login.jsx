import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/authApi"
import { Loader2 } from "lucide-react"
import { useState } from "react"

const Login = () => {
    const [loginInput, setLoginInput] = useState({
        email: '',
        password: ''
    })
    const [signupInput, setSignupInput] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [registerUser,{data : registerData,error : registerError,isLoading : registerIsLoading,isSuccess : registerIsSuccess}] = useRegisterUserMutation()
    const [loginUser,{data : loginData,error : loginError , isLoading : loginIsLoading,isSuccess : loginIsSuccess}] = useLoginUserMutation()
    const changeInputHandler = (e, type) => {
        const { name, value } = e.target
        if (type === 'signup') {
            setSignupInput({ ...signupInput, [name]: value })
        }
        else {
            setLoginInput({ ...loginInput, [name]: value })
        }
    }
    const submitHandler = async (type) => {
        const inputData = type === 'signup' ? signupInput : loginInput
        const action = type === 'signup' ? registerUser : loginUser
        await action(inputData)
    }
    return (
        <div className="flex items-center w-full justify-center p-20">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>
                                Create a new account and click signup when you are done !!
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input 
                                type='text' 
                                name = 'name'
                                value = {signupInput.name}
                                onChange={(e)=> changeInputHandler(e,'signup')} 
                                placeholder='Enter your name' />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Email</Label>
                                <Input 
                                type='email' 
                                name = 'email'
                                value = {signupInput.email}
                                onChange={(e)=> changeInputHandler(e,'signup')} 
                                placeholder='Enter your email' />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                type='password' 
                                name = 'password'
                                value = {signupInput.password}
                                onChange={(e)=> changeInputHandler(e,'signup')} 
                                placeholder='Enter your password' />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={registerIsLoading} onClick={()=>submitHandler('signup')}>
                                {
                                    registerIsLoading ? (
                                        <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait
                                        </>
                                    ) : 'Signup'
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle></CardTitle>
                            <CardDescription>
                                Login with your password and continue your journey !!!
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="username">Email</Label>
                                <Input 
                                type="email" 
                                name = 'email'
                                value = {loginInput.email}
                                onChange={(e)=> changeInputHandler(e,'login')} 
                                placeholder='Enter your email' 
                                required='true' />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                type="password"
                                name = 'password'
                                value = {loginInput.password}
                                 onChange={(e)=> changeInputHandler(e,'login')} 
                                 placeholder='Enter your password' />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled = {loginIsLoading} onClick={submitHandler}>
                                {
                                    loginIsLoading ? (
                                        <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait
                                        </>
                                    ) : 'Login'
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>

    )
}

export default Login
