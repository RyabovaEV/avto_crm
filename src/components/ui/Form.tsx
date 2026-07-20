import { Button } from './Button';

export function Form({
  children,
  ...props
}: React.FormHTMLAttributes<HTMLFormElement>) {
  return (
    <form {...props} className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">{children}</div>
      <Button className="self-end" type="submit">
        Сохранить
      </Button>
    </form>
  );
}
