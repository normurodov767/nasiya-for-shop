import { Outlet } from "react-router"
import Header from "./Header"

function Layout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout