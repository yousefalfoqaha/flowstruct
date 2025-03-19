import classes from './StudyPlanSidebar.module.css';
import {ArrowRightLeft, Folder, LogOut, ScrollText, Map} from "lucide-react";
import {Link, useParams} from "@tanstack/react-router";

const data = [
    {label: 'Overview', icon: ScrollText, page: 'overview'},
    {label: 'Framework', icon: Folder, page: 'framework'},
    {label: 'Program Map', icon: Map, page: 'program-map'}
];

export function StudyPlanSidebar({studyPlanId}: { studyPlanId: number }) {
    const {page: activePage} = useParams({strict: false});

    const links = data.map((item) => {
        const Icon = item.icon;
        return (
            <Link
                to="/study-plans/$studyPlanId/$page"
                params={{
                    studyPlanId: String(studyPlanId),
                    page: item.page
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