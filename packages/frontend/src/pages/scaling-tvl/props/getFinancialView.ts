import { Layer2 } from '@l2beat/config'
import { ApiMain } from '@l2beat/types'

import { getTvlStats } from '../../../utils/tvl/getTvlStats'
import { formatPercent, formatUSD } from '../../../utils/utils'
import { FinancialViewEntry, FinancialViewProps } from '../view/FinancialView'
import { getTechnology } from './getTechnology'

export function getFinancialView(
  projects: Layer2[],
  apiMain: ApiMain,
  tvl: number,
): FinancialViewProps {
  return {
    items: projects.map((x) => getFinancialViewEntry(x, apiMain, tvl)),
  }
}

function getFinancialViewEntry(
  project: Layer2,
  apiMain: ApiMain,
  aggregateTvl: number,
): FinancialViewEntry {
  const associatedTokens = project.config.associatedTokens ?? []
  const apiProject = apiMain.projects[project.id.toString()]
  if (!apiProject) {
    throw new Error(`Project ${project.display.name} is missing in api`)
  }
  const stats = getTvlStats(apiProject, project.display.name, associatedTokens)

  return {
    name: project.display.name,
    slug: project.display.slug,
    provider: project.technology.provider,
    tvl: formatUSD(stats.tvl),
    tvlBreakdown: stats.tvlBreakdown,
    oneDayChange: stats.oneDayChange,
    sevenDayChange: stats.sevenDayChange,
    marketShare: formatPercent(stats.tvl / aggregateTvl),
    purpose: project.display.purpose,
    technology: getTechnology(project),
  }
}