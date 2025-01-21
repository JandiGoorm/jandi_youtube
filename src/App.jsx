import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import SubscriptionsProvider from "./contexts/SubscriptionsProvider";
import PrivateRoute from "./routes/PrivateRoute";
import { routes } from "./routes/routes";

function App() {
  return (
    <AuthProvider>
      <SubscriptionsProvider>
        <Router>
          <Routes>
            {routes.map((route) => {
              return (
                <Route
                  path={route.path}
                  element={
                    <PrivateRoute requireAuth={route.requireAuth}>
                      {route.element}
                    </PrivateRoute>
                  }
                  key={route.path}
                />
              );
            })}
          </Routes>
        </Router>
      </SubscriptionsProvider>
    </AuthProvider>
  );
}

export default App;
