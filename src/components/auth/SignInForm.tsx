import { useState } from "react";
import { useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { ApiService } from "../../services/api";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await ApiService.login({ email, password });
      localStorage.setItem("token", res.token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", res.user.role);
      localStorage.setItem("user", JSON.stringify(res.user));

      if (res.user.role === "petugas") {
        navigate("/mobile/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal masuk, periksa email dan password.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (quickEmail: string) => {
    setEmail(quickEmail);
    setPassword("12345678*#");
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto pt-10">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Masuk dengan akun Admin atau Petugas
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-400">
              {errorMsg}
            </div>
          )}

          <div>
            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input 
                    type="email"
                    placeholder="email@patroli.site" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                </div>
                <div>
                  <Button className="w-full" size="sm" type="submit" disabled={loading}>
                    {loading ? "Memproses..." : "Sign in"}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-6">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Akun Demo Cepat:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleQuickLogin("admin@patroli.site")}
                  className="flex flex-col items-center justify-center p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-brand-500 dark:hover:border-brand-500 bg-gray-50 dark:bg-gray-800/50 transition"
                >
                  <span className="text-xs font-bold text-gray-800 dark:text-white">Admin</span>
                  <span className="text-[10px] text-gray-500">Dashboard Web</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin("petugas@patroli.site")}
                  className="flex flex-col items-center justify-center p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-brand-500 dark:hover:border-brand-500 bg-gray-50 dark:bg-gray-800/50 transition"
                >
                  <span className="text-xs font-bold text-gray-800 dark:text-white">Petugas</span>
                  <span className="text-[10px] text-gray-500">PWA Mobile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
