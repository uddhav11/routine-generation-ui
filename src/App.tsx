// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Provider, useSelector } from "react-redux";
// import { store } from "./app/store";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import LandingPage from "./pages/LandingPage";

// const queryClient = new QueryClient();

// const App = () => (

//   const user= useSelector((state: any) => state.auth.user);

//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <Provider store={store}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/dashboard" element={<Index />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//       </Provider>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./app/store";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import { get } from "http";
import { UseDispatch } from "react-redux";
import { getProfile } from "./app/auth/authSlice";

const queryClient = new QueryClient();

// Protect dashboard and private pages
function RequireAuth({ children }: { children: JSX.Element }) {
  const dispatch= useDispatch<any>()
  const user= dispatch(getProfile());

  console.log("this is the use from app :- ", user);
  if (!user) return <Navigate to="/" replace />;
  return children;
}

// Prevent logged-in users from accessing login/register
function GuestOnly({ children }: { children: JSX.Element }) {
  const user = useSelector((state: any) => state.auth.user);

  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <Routes>
              {/* PUBLIC Landing page */}
              <Route path="/" element={<LandingPage />} />

              {/* GUEST-ONLY ROUTES */}
              <Route
                path="/login"
                element={
                  <GuestOnly>
                    <Login />
                  </GuestOnly>
                }
              />

              <Route
                path="/register"
                element={
                  <GuestOnly>
                    <Register />
                  </GuestOnly>
                }
              />

              {/* PRIVATE ROUTES */}
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Index />
                  </RequireAuth>
                }
              />

              {/* CATCH ALL */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
