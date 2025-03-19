import classes from './StudyPlanSidebar.module.css';
import {ArrowRightLeft, Folder, LogOut, ScrollText, Map} from "lucide-react";
import {Link, useRouterState} from "@tanstack/react-router";

const data = [
    {label: 'Overview', icon: ScrollText, page: 'overview' as const},
    {label: 'Framework', icon: Folder, page: 'framework' as const},
    {label: 'Program Map', icon: Map, page: 'program-map' as const}
];

export function StudyPlanSidebar({studyPlanId}: { studyPlanId: number }) {
    const {location} = useRouterState();
    const segments = location.pathname.split('/');
    const activePage = segments.pop();

    const links = data.map((item) => {
        const Icon = item.icon;
        return (
            <Link
                to={`/study-plans/$studyPlanId/${item.page}`}
                params={{
                    studyPlanId: String(studyPlanId)
                }}
                className={classes.link}
                data-active={item.page === activePage || undefined}
                key={item.page}
            >
                <Icon className={classes.linkIcon} strokeWidth="1.5"/>
                <span>{item.label}</span>
            </Link>
        );
    });

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                {links}
            </div>

            <div className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <ArrowRightLeft className={classes.linkIcon} strokeWidth="1.5"/>
                    <span>Change account</span>
                </a>

                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <LogOut className={classes.linkIcon} strokeWidth="1.5"/>
                    <span>Logout</span>
                </a>
            </div>
        </nav>
    );
}