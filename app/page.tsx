import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  return (
    <main className="flex items-center justify-center">
      <div className="mx-auto my-auto">
        <div className="space-y-6">
          <LoginButton>
            <Button variant="secondary" size="lg">
              Redirection
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  )
}