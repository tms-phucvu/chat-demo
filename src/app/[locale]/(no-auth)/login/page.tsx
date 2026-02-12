import LocaleSwitcher from "@/components/header/locale-switcher"
import { LoginForm } from "@/features/auth/components/login/login-form"

export default function LoginPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="fixed top-4 right-4">
          <LocaleSwitcher />
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
