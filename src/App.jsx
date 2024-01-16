import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "../ui/AppLayout";
import Homepage from "../pages/Homepage";
import TicketDetails from "../pages/TicketDetails";
import SearchResults from "../pages/SearchResults";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "../pages/Login";
import TicketsAssignedToUser from "../pages/TicketsAssignedToUser";
import TicketsCreatedByUser from "../pages/TicketsCreatedByUser";
import CreateTicket from "../pages/CreateTicket";
import Profile from "../pages/Profile";
import Statistics from "../pages/Statistics";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient({});

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Homepage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/tickets/:ticketId" element={<TicketDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/stats" element={<Statistics />} />
            <Route
              path="/tickets/assigned-to-me"
              element={<TicketsAssignedToUser />}
            />
            <Route
              path="/tickets/created-by-me"
              element={<TicketsCreatedByUser />}
            />
            <Route path="/tickets/create" element={<CreateTicket />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "grey",
            color: "white",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
