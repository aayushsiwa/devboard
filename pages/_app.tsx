// pages/_app.tsx
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardPreferencesProvider } from "@/context/DashboardPreferencesContext";

import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <SessionProvider session={pageProps.session}>
            <QueryClientProvider client={queryClient}>
                <DashboardPreferencesProvider>
                    <Component {...pageProps} />
                </DashboardPreferencesProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
}

export default MyApp;
