import { afterMount, kea, path, reducers } from 'kea'
import { loaders } from 'kea-loaders'
import api from 'lib/api'
import { DashboardTemplatesRepositoryEntry } from 'scenes/dashboard/dashboards/templates/types'

import type { dashboardTemplatesLogicType } from './dashboardTemplatesLogicType'
import { LemonSelectOption } from 'lib/lemon-ui/LemonSelect'

export const dashboardTemplatesLogic = kea<dashboardTemplatesLogicType>([
    path(['scenes', 'dashboard', 'dashboards', 'templates', 'dashboardTemplatesLogic']),
    loaders({
        repository: [
            {} as Record<string, DashboardTemplatesRepositoryEntry>,
            {
                loadRepository: async () => {
                    const results = await api.get('/api/projects/@current/dashboard_templates/repository')
                    const repository: Record<string, DashboardTemplatesRepositoryEntry> = {}
                    for (const template of results as DashboardTemplatesRepositoryEntry[]) {
                        if (template.url) {
                            repository[template.url.replace(/\/+$/, '')] = template
                        }
                    }
                    return repository
                },
            },
        ],
    }),
    reducers(() => ({
        templatesList: [
            [] as LemonSelectOption<string>[],
            {
                loadRepositorySuccess: (_, { repository }) => {
                    return Object.values(repository)
                        .filter((r) => !!r.installed)
                        .map((entry) => ({
                            value: entry.name,
                            label: entry.name,
                            'data-attr': `dashboard-select-${entry.name.replace(' ', '-')}`,
                        }))
                },
            },
        ],
    })),
    afterMount(({ actions }) => {
        actions.loadRepository()
    }),
])
