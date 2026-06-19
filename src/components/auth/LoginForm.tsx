import { Button } from "../ui";

export function LoginForm() {
  return (
    <form>
      <div>
        <h1 className="font-bold text-foreground">Добро пожаловать!</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Войдите в свою учетную запись администратора.
        </p>
      </div>
      <Button className="w-full py-2.5">Войти</Button>
    </form>
  );
}
