import {createBrowserRouter} from "react-router-dom";
import React from "react";
import {
    AccountBillingPage,
    AccountNftPage,
    AccountPage,
    AccountProfilePage,
    AccountSettingsPage,
    AuthGoogle,
    DashboardPage,
    DiagramEditorPage,
    ForgotPassword, HomePage,
    LoginPage,
    ProjectDiagramsPage,
    RegistrationPage,
    TeamPage,
    VerificationLink
} from "../../pages";
import {ELinks} from "./links";
import {ProjectPage} from "../../pages/ProjectPage";
import {ProtectedRoute} from "./ProtectedRoute";


export const appRouter = createBrowserRouter([
    {
        path: ELinks.main,
        element: <DashboardPage/>,
        children: [{
            path: ELinks.accountManageData,
            element: <AccountPage/>,
            children: [{
                path: ELinks.accountProfile,
                element: <AccountProfilePage/>
            }, {
                path: ELinks.accountBilling,
                element: <AccountBillingPage/>
            }, {
                path: ELinks.accountNFT,
                element: <AccountNftPage/>
            }, {
                path: ELinks.accountSettings,
                element: <AccountSettingsPage/>
            }]
        },  {
            path: ELinks.project,
            element: <ProjectPage/>,
        }, {
            path: ELinks.home,
            element: <HomePage/>,
        },{
            path: `${ELinks.project}/:projectId`,
            element: <ProjectDiagramsPage/>,
        },{
            path: ELinks.team,
            element: <TeamPage/>
        }]
    }, {
        path: ELinks.register,
        element: <RegistrationPage/>,
    }, {
        path: ELinks.verificationLink,
        element: <VerificationLink/>,
    }, {
        path: ELinks.login,
        element: <LoginPage/>,
    }, {
        path: ELinks.forgotPassword,
        element: <ForgotPassword/>,
    }, {
        path: ELinks.authGoogle,
        element: <AuthGoogle/>,
    }, {
        path: ELinks.diagram,
        element: <DiagramEditorPage/>
    },{
        path: `${ELinks.diagram}/:diagramId`,
        element: (
            <ProtectedRoute>
                <DiagramEditorPage/>
            </ProtectedRoute>
        )
    }
]);
