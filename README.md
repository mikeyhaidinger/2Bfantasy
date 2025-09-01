# 2B Fantasy Football League Website

A modern, vibrant fantasy football league management website built with React, TypeScript, and Tailwind CSS.

## Features

- **Home Page**: Stunning league overview with animated hero section and quick navigation
- **Power Rankings**: Interactive commissioner tools for matchup analysis, team editing, and win predictions
- **League Rules**: Fully searchable rules and regulations with modern filtering
- **Draft Board**: Complete draft results for all 12 teams with expandable rosters
- **Punishments**: Tabbed interface for active punishments and sacko history with photo gallery
- **History**: Past champions showcase with regular season records and playoff results

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Lucide React Icons

## Features in Detail

### Power Rankings
- Editable team matchups for each week
- Commissioner prediction system with point margins
- Collapsible weekly sections
- Modern card-based layout with gradient styling

### Draft Board
- Round-by-round draft view
- Expandable team rosters showing all 16 rounds of picks
- Position-coded player cards
- Responsive grid layout

### League Management
- Searchable rules database
- Punishment selection system
- Historical records tracking
- Mobile-optimized interface

## Customization

The website is designed to be easily customizable:
- Update team names in the component files
- Modify league rules in `src/pages/LeagueRules.tsx`
- Add draft picks in `src/pages/Draft.tsx`
- Update punishment options in `src/pages/Punishments.tsx`
- Add historical data in `src/pages/History.tsx`

## Future Enhancements

- ESPN API integration for automatic matchup imports
- Real-time scoring updates
- Player statistics integration
- Mobile app version