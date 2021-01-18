export const NavbarDetails = (authFinder) => {
    return (
        [
            {
            isButton: false,
            to: "/",
            isLastLink: false,
            name: "Home"
        },
            {
            isButton: false,
            to: "/pots",
            isLastLink: false,
            name: "Pots"
        },
        {
            isButton: false,
            to: "/gift/plants",
            isLastLink: false,
            name: "Gift Plants"
        },
        {
            isButton: false,
            to: "/bowls",
            isLastLink: false,
            name: "Bowls"
            },
        {
            isText: true,
        },
        {
            isButton: false,
            to: "/seed",
            isLastLink: false,
            name: "Seeds"
        },
        {
            isButton: true,
            to: "/signup",
            authFinder: authFinder,
            isLastLink: true,
            name: "Signup"
        },
        {
            isButton: true,
            to: "/login",
            authFinder: authFinder,
            isLastLink: false,
            name: "Login"
        },
        {
            isButton: true,
            to: "/",
            authFinder: !authFinder,
            isLastLink: true,
            name: "Logout"
        }
        ]
    );
}