import { Card, CardContent } from "../components/UI/card";
import { Package, ShoppingCart, Users, BarChart3 } from "lucide-react";
import { useEffect } from "react";

export default function AdminDashboard() {
  
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-fujiBase/60 via-bgAccent to-fujiLight p-4
                    rounded-2xl shadow-xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-textPrimary">Адмін-панель (管理者ダッシュボード)</h1>
        <p className="text-textSecondary mt-1">Система керування магазином • спокійно, як Фудзі</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card className="rounded-2xl shadow-sm bg-white/80 backdrop-blur">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-peachFaint text-lineStrong">
              <Package size={26}/>
            </div>
            <div>
              <p className="text-xl text-textPrimary/80">Товари</p>
              <p className="text-2xl font-semibold text-stone-800">128</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm bg-white/80 backdrop-blur">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-rose-100 text-rose-600">
              <ShoppingCart />
            </div>
            <div>
              <p className="text-sm text-stone-500">Замовлення</p>
              <p className="text-2xl font-semibold text-stone-800">32</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm bg-white/80 backdrop-blur">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-pink-100 text-pink-600">
              <Users />
            </div>
            <div>
              <p className="text-sm text-stone-500">Користувачі</p>
              <p className="text-2xl font-semibold text-stone-800">764</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm bg-white/80 backdrop-blur">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-rose-100 text-rose-600">
              <BarChart3 />
            </div>
            <div>
              <p className="text-sm text-stone-500">Оборот (міс.)</p>
              <p className="text-2xl font-semibold text-stone-800">€12 480</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders */}
        <Card className="lg:col-span-2 rounded-2xl bg-white/80 backdrop-blur shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-stone-800 mb-4">Останні замовлення</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span>#1042 • Jan Kowalski</span>
                <span className="text-rose-600">W trakcie</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>#1041 • Anna Nowak</span>
                <span className="text-pink-600">Nowe</span>
              </div>
              <div className="flex justify-between">
                <span>#1040 • Piotr Zieliński</span>
                <span className="text-stone-500">Zrealizowane</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="rounded-2xl bg-white/80 backdrop-blur shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-stone-800 mb-4">Нотатки адміна</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Сакура цвіте недовго — як і увага користувача. 
              Перевір нові замовлення, онови статуси і не забудь про звіт наприкінці дня.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
