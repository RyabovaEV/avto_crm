import { Bus } from "lucide-react";

export function Logo() {
    return (
        <>
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
        </>
    )
}