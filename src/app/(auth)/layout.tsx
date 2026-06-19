import { Bus } from "lucide-react";
import { ReactNode } from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex w-[45%] flex-col justify-between bg-sidebar p-12 overflow-hidden relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="absolute border border-white rounded-full"
              style={{
                width: `${(i + 1) * 120}px`,
                height: `${(i + 1) * 120}px`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
        <div className="h-0.5 w-32 bg-linear-to-r from-blue-400 to-cyan-400 rounded-full" />
        {/* Center logo block */}
        <div className="relative z-10 flex flex-col items-start gap-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-400/20 rounded-2xl flex items-center justify-center border border-blue-400/30">
              <Bus size={28} className="text-blue-300" />
            </div>
            <div>
              <div className="text-white text-2xl font-bold tracking-tight">
                ООО &quot;Авто&quot;
              </div>
              <div className="text-blue-300 text-sm">
                Транспортное предприятие
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-white/80 text-base leading-relaxed max-w-xs">
              Управляйте маршрутами, расписаниями, программами автошколы и
              вакансиями — всё в одном месте.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              {["Новости", "Маршруты", "Автошкола", "Вакансии"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-blue-200 text-sm"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-blue-400/60 text-xs font-mono">
          © {new Date().getFullYear()} Панель администратора
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <Bus size={18} className="text-card" />
            </div>
            <span className="text-foreground font-bold text-lg">ООО &quot;Авто&quot;</span>
          </div>
          {/* Tab switcher */}
          <div className="flex rounded-xl bg-secondary p-1 mb-8">
            <button className="flex-1 py-2 text-sm font-medium rounded-lg transition-all capitalize">Sign In</button>
{/*             {(["login", "register"] as AuthMode[]).map(m => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all capitalize ${
                  mode === m
                    ? "bg-white text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))} */}
          </div>
            {children}
        </div>
      </div>
    </div>
  );
}
