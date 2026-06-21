import { Eye, Mail, User, Lock } from 'lucide-react';
import { Button, Input } from '../ui';

export function RegisterForm() {
  return (
    <form className="space-y-5">
      <div>
        <h1 className="font-bold text-foreground">Регистрация</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Для доступа к порталу требуется регистрация.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Введите ФИО"
          autoComplete="email"
          icon={User}
        />
        <Input
          type="email"
          placeholder="Введите email"
          autoComplete="email"
          icon={Mail}
        />
        <Input
          type="password"
          placeholder="Введите пароль"
          autoComplete="password"
          icon={Lock}
          rightIcon={Eye}
        />
        <Input
          type="password"
          placeholder="Подтвердите пароль"
          autoComplete="password"
          icon={Lock}
        />
      </div>
      <Button type="submit" className="w-full py-2.5">
        Зарегистрироваться
      </Button>
    </form>
  );
}
