import {
    Home,
    Dashboard,
    Database,
    Apps,
    Person,
    Question,
    GridMasonry,
    People,
    TestTube,
    Toggle,
    RewindPlay,
    Graph,
    Toolbar,
} from '@posthog/icons'
import { Scene } from 'scenes/sceneTypes'
import { urls } from 'scenes/urls'
import { NavbarItem } from './types'
import { dashboardsSidebarLogic } from './sidebars/dashboards'
import { featureFlagsSidebarLogic } from './sidebars/featureFlags'
import { cohortsSidebarLogic } from './sidebars/cohorts'
import { personsAndGroupsSidebarLogic } from './sidebars/personsAndGroups'
import { insightsSidebarLogic } from './sidebars/insights'
import { dataManagementSidebarLogic } from './sidebars/dataManagement'
import { annotationsSidebarLogic } from './sidebars/annotations'
import { experimentsSidebarLogic } from './sidebars/experiments'
import { toolbarSidebarLogic } from './sidebars/toolbar'

/** A list of navbar sections with items. */
export const NAVBAR_ITEMS: NavbarItem[][] = [
    [
        {
            identifier: Scene.ProjectHomepage,
            label: 'Project homepage',
            icon: <Home />,
            to: urls.projectHomepage(),
        },
        {
            identifier: Scene.Dashboards,
            label: 'Dashboards',
            icon: <Dashboard />,
            logic: dashboardsSidebarLogic,
        },
        {
            identifier: Scene.DataManagement,
            label: 'Data management',
            icon: <Database />,
            logic: dataManagementSidebarLogic,
        },
        {
            identifier: Scene.Persons,
            label: 'Persons and groups',
            icon: <Person />,
            logic: personsAndGroupsSidebarLogic,
        },
        {
            identifier: Scene.Cohorts,
            label: 'Cohorts',
            icon: <People />,
            logic: cohortsSidebarLogic,
        },
        {
            identifier: Scene.Annotations,
            label: 'Annotations',
            icon: <Question />, // TODO: Should be bubble
            logic: annotationsSidebarLogic,
        },
    ],
    [
        {
            identifier: Scene.Events,
            label: 'Events',
            icon: <GridMasonry />, // TODO: Should be live signal
        },
        {
            identifier: Scene.SavedInsights,
            label: 'Product Analytics',
            icon: <Graph />,
            logic: insightsSidebarLogic,
        },
        {
            identifier: Scene.Replay,
            label: 'Session Replay',
            icon: <RewindPlay />,
        },
        {
            identifier: Scene.FeatureFlags,
            label: 'Feature Flags',
            icon: <Toggle />,
            logic: featureFlagsSidebarLogic,
        },
        {
            identifier: Scene.Experiments,
            label: 'A/B Testing',
            icon: <TestTube />,
            logic: experimentsSidebarLogic,
        },
        {
            identifier: Scene.ToolbarLaunch,
            label: 'Toolbar',
            icon: <Toolbar />,
            logic: toolbarSidebarLogic,
        },
    ],
    [
        {
            identifier: Scene.Plugins,
            label: 'Apps',
            icon: <Apps />,
        },
    ],
]

export const NAVBAR_ITEM_ID_TO_ITEM: Record<string, NavbarItem> = Object.fromEntries(
    NAVBAR_ITEMS.flat().map((item) => [item.identifier, item])
)
