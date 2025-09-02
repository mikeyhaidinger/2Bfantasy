# 2B Fantasy Football League Website

A modern, vibrant fantasy football league management website built with React, TypeScript, Tailwind CSS, and Supabase.

🌐 **Live Site**: [https://2b-fantasy-football-dic6.bolt.host](https://2b-fantasy-football-dic6.bolt.host)

## Features

- **Home Page**: League overview with editable deadlines and quick navigation
- **Power Rankings**: Interactive commissioner tools for matchup analysis, team editing, and win predictions
- **League Rules**: Fully searchable rules and regulations with modern filtering
- **Draft Board**: Complete 2025 draft results for all 12 teams with expandable rosters
- **Punishments**: Tabbed interface for active punishments and sacko history with photo gallery
- **History**: Past champions showcase with regular season records and playoff results

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Supabase (PostgreSQL database)
- **Routing**: React Router
- **Icons**: Lucide React
- **Hosting**: Bolt Hosting

## Database Schema

The application uses Supabase with the following tables:

### `matchups`
- Stores weekly matchup data, commissioner analysis, and predictions
- Supports 13 weeks of regular season matchups
- Includes completion tracking and prediction margins

### `deadlines`
- Stores important league deadlines (trade, keeper)
- Supports timezone handling (EST)
- Editable through the home page interface

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/2b-fantasy-football.git
   cd 2b-fantasy-football
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Features in Detail

### Power Rankings
- Editable team matchups for each week (1-13)
- Commissioner prediction system with point margins
- Collapsible weekly sections with completion tracking
- Modern card-based layout with gradient styling
- Auto-expansion of next incomplete week

### Draft Board
- Complete 2025 draft results (16 rounds, 12 teams)
- Round-by-round draft view with team roster expansion
- Position-coded player cards with color gradients
- Responsive grid layout for all screen sizes

### Home Page Deadlines
- Editable trade and keeper deadlines
- EST timezone support with proper database storage
- Real-time updates with Supabase integration
- Clean, modern interface with save/cancel functionality

### League Management
- Searchable rules database with highlighting
- Punishment selection system with historical tracking
- Historical records with champion showcases
- Mobile-optimized responsive interface

## Customization

The website is designed to be easily customizable:
- Update team names in the component files
- Modify league rules in `src/pages/LeagueRules.tsx`
- Add draft picks in `src/pages/Draft.tsx`
- Update punishment options in `src/pages/Punishments.tsx`
- Add historical data in `src/pages/History.tsx`

## Database Setup

The application requires a Supabase database with the following setup:

1. Create tables using the migration files in `/supabase/migrations/`
2. Enable Row Level Security (RLS) on all tables
3. Set up public access policies for read/write operations
4. Configure environment variables for connection

## Deployment

The application is deployed on Bolt Hosting with automatic builds from the main branch.

### Manual Deployment
```bash
npm run build
# Deploy the dist/ folder to your hosting provider
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and intended for the 2B Fantasy Football League.

## Support

For issues or questions, contact the league commissioner or create an issue in this repository.