import React, { useState } from 'react';
import { Users, ChevronDown, ChevronUp } from 'lucide-react';

interface DraftPick {
  round: number;
  pick: number;
  team: string;
  player: string;
  position: string;
}

interface TeamRoster {
  teamName: string;
  picks: DraftPick[];
}

const Draft = () => {
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set());
  const [selectedRound, setSelectedRound] = useState(1);

  const teams = [
    'The Silverbacks', 'Team Gone Jawnson', 'Pink Sock', 'The Pancake Football Team',
    'Zweeg', 'Maui Mooseknuckles', 'NJ Old School', 'Central Saudi Scammers',
    'Jersey Shore Supplements', 'Calamari Ballsrings', 'Sonalika Scorchers', 'Maine Course'
  ];

  // Actual 2025 draft data
  const [draftPicks] = useState<DraftPick[]>([
    // Round 1
    { round: 1, pick: 1, team: 'The Silverbacks', player: 'Ja\'Marr Chase', position: 'WR' },
    { round: 1, pick: 2, team: 'Sonalika Scorchers', player: 'Saquon Barkley', position: 'RB' },
    { round: 1, pick: 3, team: 'Calamari Ballsrings', player: 'Bijan Robinson', position: 'RB' },
    { round: 1, pick: 4, team: 'NJ Old School', player: 'Jahmyr Gibbs', position: 'RB' },
    { round: 1, pick: 5, team: 'Pink Sock', player: 'Justin Jefferson', position: 'WR' },
    { round: 1, pick: 6, team: 'Jersey Shore Supplements', player: 'Christian McCaffrey', position: 'RB' },
    { round: 1, pick: 7, team: 'The Pancake Football Team', player: 'Ashton Jeanty', position: 'RB' },
    { round: 1, pick: 8, team: 'Central Saudi Scammers', player: 'CeeDee Lamb', position: 'WR' },
    { round: 1, pick: 9, team: 'Maui Mooseknuckles', player: 'Puka Nacua', position: 'WR' },
    { round: 1, pick: 10, team: 'Zweeg', player: 'Nico Collins', position: 'WR' },
    { round: 1, pick: 11, team: 'Maine Course', player: 'Amon-Ra St. Brown', position: 'WR' },
    { round: 1, pick: 12, team: 'Team Gone Jawnson', player: 'A.J. Brown', position: 'WR' },
    
    // Round 2
    { round: 2, pick: 13, team: 'Team Gone Jawnson', player: 'Bucky Irving', position: 'RB' },
    { round: 2, pick: 14, team: 'Maine Course', player: 'Jonathan Taylor', position: 'RB' },
    { round: 2, pick: 15, team: 'Zweeg', player: 'Derrick Henry', position: 'RB' },
    { round: 2, pick: 16, team: 'Maui Mooseknuckles', player: 'Josh Jacobs', position: 'RB' },
    { round: 2, pick: 17, team: 'Central Saudi Scammers', player: 'Drake London', position: 'WR' },
    { round: 2, pick: 18, team: 'The Pancake Football Team', player: 'Josh Allen', position: 'QB' },
    { round: 2, pick: 19, team: 'Jersey Shore Supplements', player: 'De\'Von Achane', position: 'RB' },
    { round: 2, pick: 20, team: 'Pink Sock', player: 'Kyren Williams', position: 'RB' },
    { round: 2, pick: 21, team: 'NJ Old School', player: 'James Cook', position: 'RB' },
    { round: 2, pick: 22, team: 'Calamari Ballsrings', player: 'Davante Adams', position: 'WR' },
    { round: 2, pick: 23, team: 'Sonalika Scorchers', player: 'Lamar Jackson', position: 'QB' },
    { round: 2, pick: 24, team: 'The Silverbacks', player: 'Terry McLaurin', position: 'WR' },
    
    // Round 3
    { round: 3, pick: 25, team: 'The Silverbacks', player: 'Omarion Hampton', position: 'RB' },
    { round: 3, pick: 26, team: 'Sonalika Scorchers', player: 'Malik Nabers', position: 'WR' },
    { round: 3, pick: 27, team: 'Calamari Ballsrings', player: 'Tyreek Hill', position: 'WR' },
    { round: 3, pick: 28, team: 'NJ Old School', player: 'DK Metcalf', position: 'WR' },
    { round: 3, pick: 29, team: 'Pink Sock', player: 'Tee Higgins', position: 'WR' },
    { round: 3, pick: 30, team: 'Jersey Shore Supplements', player: 'Trey McBride', position: 'TE' },
    { round: 3, pick: 31, team: 'The Pancake Football Team', player: 'Garrett Wilson', position: 'WR' },
    { round: 3, pick: 32, team: 'Central Saudi Scammers', player: 'Joe Burrow', position: 'QB' },
    { round: 3, pick: 33, team: 'Maui Mooseknuckles', player: 'Marvin Harrison Jr.', position: 'WR' },
    { round: 3, pick: 34, team: 'Zweeg', player: 'Kenneth Walker III', position: 'RB' },
    { round: 3, pick: 35, team: 'Maine Course', player: 'Chuba Hubbard', position: 'RB' },
    { round: 3, pick: 36, team: 'Team Gone Jawnson', player: 'Mike Evans', position: 'WR' },
    
    // Round 4
    { round: 4, pick: 37, team: 'Team Gone Jawnson', player: 'TreVeyon Henderson', position: 'RB' },
    { round: 4, pick: 38, team: 'Maine Course', player: 'Jalen Hurts', position: 'QB' },
    { round: 4, pick: 39, team: 'Zweeg', player: 'Zay Flowers', position: 'WR' },
    { round: 4, pick: 40, team: 'Maui Mooseknuckles', player: 'Breece Hall', position: 'RB' },
    { round: 4, pick: 41, team: 'Central Saudi Scammers', player: 'Alvin Kamara', position: 'RB' },
    { round: 4, pick: 42, team: 'The Pancake Football Team', player: 'DJ Moore', position: 'WR' },
    { round: 4, pick: 43, team: 'Jersey Shore Supplements', player: 'Tetairoa McMillan', position: 'WR' },
    { round: 4, pick: 44, team: 'Pink Sock', player: 'James Conner', position: 'RB' },
    { round: 4, pick: 45, team: 'NJ Old School', player: 'DeVonta Smith', position: 'WR' },
    { round: 4, pick: 46, team: 'Calamari Ballsrings', player: 'Baker Mayfield', position: 'QB' },
    { round: 4, pick: 47, team: 'Sonalika Scorchers', player: 'Courtland Sutton', position: 'WR' },
    { round: 4, pick: 48, team: 'The Silverbacks', player: 'D\'Andre Swift', position: 'RB' },
    
    // Round 5
    { round: 5, pick: 49, team: 'The Silverbacks', player: 'Patrick Mahomes', position: 'QB' },
    { round: 5, pick: 50, team: 'Sonalika Scorchers', player: 'Calvin Ridley', position: 'WR' },
    { round: 5, pick: 51, team: 'Calamari Ballsrings', player: 'Jameson Williams', position: 'WR' },
    { round: 5, pick: 52, team: 'NJ Old School', player: 'Xavier Worthy', position: 'WR' },
    { round: 5, pick: 53, team: 'Pink Sock', player: 'George Kittle', position: 'TE' },
    { round: 5, pick: 54, team: 'Jersey Shore Supplements', player: 'Tony Pollard', position: 'RB' },
    { round: 5, pick: 55, team: 'The Pancake Football Team', player: 'Sam LaPorta', position: 'TE' },
    { round: 5, pick: 56, team: 'Central Saudi Scammers', player: 'RJ Harvey', position: 'RB' },
    { round: 5, pick: 57, team: 'Maui Mooseknuckles', player: 'Travis Kelce', position: 'TE' },
    { round: 5, pick: 58, team: 'Zweeg', player: 'Travis Hunter', position: 'WR' },
    { round: 5, pick: 59, team: 'Maine Course', player: 'Jaylen Waddle', position: 'WR' },
    { round: 5, pick: 60, team: 'Team Gone Jawnson', player: 'Jerry Jeudy', position: 'WR' },
    
    // Round 6
    { round: 6, pick: 61, team: 'Team Gone Jawnson', player: 'Tyler Warren', position: 'TE' },
    { round: 6, pick: 62, team: 'Maine Course', player: 'Evan Engram', position: 'TE' },
    { round: 6, pick: 63, team: 'Zweeg', player: 'David Montgomery', position: 'RB' },
    { round: 6, pick: 64, team: 'Maui Mooseknuckles', player: 'George Pickens', position: 'WR' },
    { round: 6, pick: 65, team: 'Central Saudi Scammers', player: 'Jaxon Smith-Njigba', position: 'WR' },
    { round: 6, pick: 66, team: 'The Pancake Football Team', player: 'Jacory Croskey-Merritt', position: 'RB' },
    { round: 6, pick: 67, team: 'Jersey Shore Supplements', player: 'Rashee Rice', position: 'WR' },
    { round: 6, pick: 68, team: 'Pink Sock', player: 'Rome Odunze', position: 'WR' },
    { round: 6, pick: 69, team: 'NJ Old School', player: 'Aaron Jones Sr.', position: 'RB' },
    { round: 6, pick: 70, team: 'Calamari Ballsrings', player: 'Isiah Pacheco', position: 'RB' },
    { round: 6, pick: 71, team: 'Sonalika Scorchers', player: 'Tyrone Tracy Jr.', position: 'RB' },
    { round: 6, pick: 72, team: 'The Silverbacks', player: 'Ricky Pearsall', position: 'WR' },
    
    // Round 7
    { round: 7, pick: 73, team: 'The Silverbacks', player: 'Emeka Egbuka', position: 'WR' },
    { round: 7, pick: 74, team: 'Sonalika Scorchers', player: 'T.J. Hockenson', position: 'TE' },
    { round: 7, pick: 75, team: 'Calamari Ballsrings', player: 'Stefon Diggs', position: 'WR' },
    { round: 7, pick: 76, team: 'NJ Old School', player: 'Chris Olave', position: 'WR' },
    { round: 7, pick: 77, team: 'Pink Sock', player: 'Jaylen Warren', position: 'RB' },
    { round: 7, pick: 78, team: 'Jersey Shore Supplements', player: 'Matthew Golden', position: 'WR' },
    { round: 7, pick: 79, team: 'The Pancake Football Team', player: 'Jakobi Meyers', position: 'WR' },
    { round: 7, pick: 80, team: 'Central Saudi Scammers', player: 'Mark Andrews', position: 'TE' },
    { round: 7, pick: 81, team: 'Maui Mooseknuckles', player: 'David Njoku', position: 'TE' },
    { round: 7, pick: 82, team: 'Zweeg', player: 'J.K. Dobbins', position: 'RB' },
    { round: 7, pick: 83, team: 'Maine Course', player: 'Ladd McConkey', position: 'WR' },
    { round: 7, pick: 84, team: 'Team Gone Jawnson', player: 'Jordan Mason', position: 'RB' },
    
    // Round 8
    { round: 8, pick: 85, team: 'Team Gone Jawnson', player: 'Bo Nix', position: 'QB' },
    { round: 8, pick: 86, team: 'Maine Course', player: 'Deebo Samuel', position: 'WR' },
    { round: 8, pick: 87, team: 'Zweeg', player: 'Brian Thomas Jr.', position: 'WR' },
    { round: 8, pick: 88, team: 'Maui Mooseknuckles', player: 'Cooper Kupp', position: 'WR' },
    { round: 8, pick: 89, team: 'Central Saudi Scammers', player: 'Javonte Williams', position: 'RB' },
    { round: 8, pick: 90, team: 'The Pancake Football Team', player: 'Kaleb Johnson', position: 'RB' },
    { round: 8, pick: 91, team: 'Jersey Shore Supplements', player: 'Michael Pittman Jr.', position: 'WR' },
    { round: 8, pick: 92, team: 'Pink Sock', player: 'Cam Skattebo', position: 'RB' },
    { round: 8, pick: 93, team: 'NJ Old School', player: 'Travis Etienne Jr.', position: 'RB' },
    { round: 8, pick: 94, team: 'Calamari Ballsrings', player: 'Brock Bowers', position: 'TE' },
    { round: 8, pick: 95, team: 'Sonalika Scorchers', player: 'Quinshon Judkins', position: 'RB' },
    { round: 8, pick: 96, team: 'The Silverbacks', player: 'Zach Charbonnet', position: 'RB' },
    
    // Round 9
    { round: 9, pick: 97, team: 'The Silverbacks', player: 'Kyler Murray', position: 'QB' },
    { round: 9, pick: 98, team: 'Sonalika Scorchers', player: 'Khalil Shakir', position: 'WR' },
    { round: 9, pick: 99, team: 'Calamari Ballsrings', player: 'Austin Ekeler', position: 'RB' },
    { round: 9, pick: 100, team: 'NJ Old School', player: 'Chris Godwin Jr.', position: 'WR' },
    { round: 9, pick: 101, team: 'Pink Sock', player: 'Keon Coleman', position: 'WR' },
    { round: 9, pick: 102, team: 'Jersey Shore Supplements', player: 'Jayden Daniels', position: 'QB' },
    { round: 9, pick: 103, team: 'The Pancake Football Team', player: 'Jauan Jennings', position: 'WR' },
    { round: 9, pick: 104, team: 'Central Saudi Scammers', player: 'Rhamondre Stevenson', position: 'RB' },
    { round: 9, pick: 105, team: 'Maui Mooseknuckles', player: 'Jerome Ford', position: 'RB' },
    { round: 9, pick: 106, team: 'Zweeg', player: 'Tucker Kraft', position: 'TE' },
    { round: 9, pick: 107, team: 'Maine Course', player: 'Jaydon Blue', position: 'RB' },
    { round: 9, pick: 108, team: 'Team Gone Jawnson', player: 'Chase Brown', position: 'RB' },
    
    // Round 10
    { round: 10, pick: 109, team: 'Team Gone Jawnson', player: 'Darnell Mooney', position: 'WR' },
    { round: 10, pick: 110, team: 'Maine Course', player: 'Kyle Pitts Sr.', position: 'TE' },
    { round: 10, pick: 111, team: 'Zweeg', player: 'Rashod Bateman', position: 'WR' },
    { round: 10, pick: 112, team: 'Maui Mooseknuckles', player: 'Caleb Williams', position: 'QB' },
    { round: 10, pick: 113, team: 'Central Saudi Scammers', player: 'Jordan Addison', position: 'WR' },
    { round: 10, pick: 114, team: 'The Pancake Football Team', player: 'Trey Benson', position: 'RB' },
    { round: 10, pick: 115, team: 'Jersey Shore Supplements', player: 'Keenan Allen', position: 'WR' },
    { round: 10, pick: 116, team: 'Pink Sock', player: 'Brock Purdy', position: 'QB' },
    { round: 10, pick: 117, team: 'NJ Old School', player: 'Justin Herbert', position: 'QB' },
    { round: 10, pick: 118, team: 'Calamari Ballsrings', player: 'Jayden Reed', position: 'WR' },
    { round: 10, pick: 119, team: 'Sonalika Scorchers', player: 'Nick Chubb', position: 'RB' },
    { round: 10, pick: 120, team: 'The Silverbacks', player: 'Colston Loveland', position: 'TE' },
    
    // Round 11
    { round: 11, pick: 121, team: 'The Silverbacks', player: 'Tank Bigsby', position: 'RB' },
    { round: 11, pick: 122, team: 'Sonalika Scorchers', player: 'Xavier Legette', position: 'WR' },
    { round: 11, pick: 123, team: 'Calamari Ballsrings', player: 'Jared Goff', position: 'QB' },
    { round: 11, pick: 124, team: 'NJ Old School', player: 'Jordan Love', position: 'QB' },
    { round: 11, pick: 125, team: 'Pink Sock', player: 'Drake Maye', position: 'QB' },
    { round: 11, pick: 126, team: 'Jersey Shore Supplements', player: 'Bhayshul Tuten', position: 'RB' },
    { round: 11, pick: 127, team: 'The Pancake Football Team', player: 'J.J. McCarthy', position: 'QB' },
    { round: 11, pick: 128, team: 'Central Saudi Scammers', player: 'C.J. Stroud', position: 'QB' },
    { round: 11, pick: 129, team: 'Maui Mooseknuckles', player: 'Hollywood Brown', position: 'WR' },
    { round: 11, pick: 130, team: 'Zweeg', player: 'Dak Prescott', position: 'QB' },
    { round: 11, pick: 131, team: 'Maine Course', player: 'Broncos D/ST', position: 'DEF' },
    { round: 11, pick: 132, team: 'Team Gone Jawnson', player: 'Braelon Allen', position: 'RB' },
    
    // Round 12
    { round: 12, pick: 133, team: 'Team Gone Jawnson', player: 'Steelers D/ST', position: 'DEF' },
    { round: 12, pick: 134, team: 'Maine Course', player: 'Brian Robinson Jr.', position: 'RB' },
    { round: 12, pick: 135, team: 'Zweeg', player: 'Jake Ferguson', position: 'TE' },
    { round: 12, pick: 136, team: 'Maui Mooseknuckles', player: 'Joe Mixon', position: 'RB' },
    { round: 12, pick: 137, team: 'Central Saudi Scammers', player: 'Dallas Goedert', position: 'TE' },
    { round: 12, pick: 138, team: 'The Pancake Football Team', player: 'Cedric Tillman', position: 'WR' },
    { round: 12, pick: 139, team: 'Jersey Shore Supplements', player: 'Justin Fields', position: 'QB' },
    { round: 12, pick: 140, team: 'Pink Sock', player: 'Najee Harris', position: 'RB' },
    { round: 12, pick: 141, team: 'NJ Old School', player: 'Dalton Kincaid', position: 'TE' },
    { round: 12, pick: 142, team: 'Calamari Ballsrings', player: 'Zach Ertz', position: 'TE' },
    { round: 12, pick: 143, team: 'Sonalika Scorchers', player: 'Rashid Shaheed', position: 'WR' },
    { round: 12, pick: 144, team: 'The Silverbacks', player: 'Jayden Higgins', position: 'WR' },
    
    // Round 13
    { round: 13, pick: 145, team: 'The Silverbacks', player: 'Wan\'Dale Robinson', position: 'WR' },
    { round: 13, pick: 146, team: 'Sonalika Scorchers', player: 'Texans D/ST', position: 'DEF' },
    { round: 13, pick: 147, team: 'Calamari Ballsrings', player: 'Rachaad White', position: 'RB' },
    { round: 13, pick: 148, team: 'NJ Old School', player: 'Brandon Aiyuk', position: 'WR' },
    { round: 13, pick: 149, team: 'Pink Sock', player: 'Josh Downs', position: 'WR' },
    { round: 13, pick: 150, team: 'Jersey Shore Supplements', player: 'Ollie Gordon II', position: 'RB' },
    { round: 13, pick: 151, team: 'The Pancake Football Team', player: 'Ray Davis', position: 'RB' },
    { round: 13, pick: 152, team: 'Central Saudi Scammers', player: 'Ravens D/ST', position: 'DEF' },
    { round: 13, pick: 153, team: 'Maui Mooseknuckles', player: 'Eagles D/ST', position: 'DEF' },
    { round: 13, pick: 154, team: 'Zweeg', player: 'Kyle Monangai', position: 'RB' },
    { round: 13, pick: 155, team: 'Maine Course', player: 'Michael Penix Jr.', position: 'QB' },
    { round: 13, pick: 156, team: 'Team Gone Jawnson', player: 'Adam Thielen', position: 'WR' },
    
    // Round 14
    { round: 14, pick: 157, team: 'Team Gone Jawnson', player: 'Brandon Aubrey', position: 'K' },
    { round: 14, pick: 158, team: 'Maine Course', player: 'Marvin Mims Jr.', position: 'WR' },
    { round: 14, pick: 159, team: 'Zweeg', player: 'Packers D/ST', position: 'DEF' },
    { round: 14, pick: 160, team: 'Maui Mooseknuckles', player: 'Kendre Miller', position: 'RB' },
    { round: 14, pick: 161, team: 'Central Saudi Scammers', player: 'Will Shipley', position: 'RB' },
    { round: 14, pick: 162, team: 'The Pancake Football Team', player: 'Vikings D/ST', position: 'DEF' },
    { round: 14, pick: 163, team: 'Jersey Shore Supplements', player: 'Dylan Sampson', position: 'RB' },
    { round: 14, pick: 164, team: 'Pink Sock', player: 'Tyler Allgeier', position: 'RB' },
    { round: 14, pick: 165, team: 'NJ Old School', player: 'Amari Cooper', position: 'WR' },
    { round: 14, pick: 166, team: 'Calamari Ballsrings', player: 'Seahawks D/ST', position: 'DEF' },
    { round: 14, pick: 167, team: 'Sonalika Scorchers', player: 'Chris Boswell', position: 'K' },
    { round: 14, pick: 168, team: 'The Silverbacks', player: 'Tyjae Spears', position: 'RB' },
    
    // Round 15
    { round: 15, pick: 169, team: 'The Silverbacks', player: 'Chase McLaughlin', position: 'K' },
    { round: 15, pick: 170, team: 'Sonalika Scorchers', player: 'Elic Ayomanor', position: 'WR' },
    { round: 15, pick: 171, team: 'Calamari Ballsrings', player: 'Cameron Dicker', position: 'K' },
    { round: 15, pick: 172, team: 'NJ Old School', player: 'Giants D/ST', position: 'DEF' },
    { round: 15, pick: 173, team: 'Pink Sock', player: 'Jake Elliott', position: 'K' },
    { round: 15, pick: 174, team: 'Jersey Shore Supplements', player: 'Jake Bates', position: 'K' },
    { round: 15, pick: 175, team: 'The Pancake Football Team', player: 'Woody Marks', position: 'RB' },
    { round: 15, pick: 176, team: 'Central Saudi Scammers', player: 'Luther Burden III', position: 'WR' },
    { round: 15, pick: 177, team: 'Maui Mooseknuckles', player: 'Cam Ward', position: 'QB' },
    { round: 15, pick: 178, team: 'Zweeg', player: 'Trevor Lawrence', position: 'QB' },
    { round: 15, pick: 179, team: 'Maine Course', player: 'Matt Gay', position: 'K' },
    { round: 15, pick: 180, team: 'Team Gone Jawnson', player: 'Dameon Pierce', position: 'RB' },
    
    // Round 16
    { round: 16, pick: 181, team: 'Team Gone Jawnson', player: 'Cade Otton', position: 'TE' },
    { round: 16, pick: 182, team: 'Maine Course', player: 'Blake Corum', position: 'RB' },
    { round: 16, pick: 183, team: 'Zweeg', player: 'Tyler Loop', position: 'K' },
    { round: 16, pick: 184, team: 'Maui Mooseknuckles', player: 'Tyler Bass', position: 'K' },
    { round: 16, pick: 185, team: 'Central Saudi Scammers', player: 'Harrison Butker', position: 'K' },
    { round: 16, pick: 186, team: 'The Pancake Football Team', player: 'Younghoe Koo', position: 'K' },
    { round: 16, pick: 187, team: 'Jersey Shore Supplements', player: 'Lions D/ST', position: 'DEF' },
    { round: 16, pick: 188, team: 'Pink Sock', player: 'Patriots D/ST', position: 'DEF' },
    { round: 16, pick: 189, team: 'NJ Old School', player: 'Cam Little', position: 'K' },
    { round: 16, pick: 190, team: 'Calamari Ballsrings', player: 'Bills D/ST', position: 'DEF' },
    { round: 16, pick: 191, team: 'Sonalika Scorchers', player: 'Isaac TeSlaa', position: 'WR' },
    { round: 16, pick: 192, team: 'The Silverbacks', player: 'Buccaneers D/ST', position: 'DEF' },
  ]);

  const rounds = Array.from({ length: 16 }, (_, i) => i + 1);

  const getRoundPicks = (round: number) => {
    return draftPicks.filter(pick => pick.round === round);
  };

  const getTeamPicks = (teamName: string) => {
    return draftPicks.filter(pick => pick.team === teamName).sort((a, b) => a.round - b.round);
  };

  const toggleTeam = (teamName: string) => {
    const newExpanded = new Set(expandedTeams);
    if (newExpanded.has(teamName)) {
      newExpanded.delete(teamName);
    } else {
      newExpanded.add(teamName);
    }
    setExpandedTeams(newExpanded);
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'QB': return 'bg-gradient-to-r from-red-500 to-rose-500 text-white';
      case 'RB': return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      case 'WR': return 'bg-gradient-to-r from-emerald-500 to-green-500 text-white';
      case 'TE': return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'K': return 'bg-gradient-to-r from-purple-500 to-violet-500 text-white';
      case 'DEF': return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white';
      default: return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-red-600 bg-clip-text text-transparent mb-4">2025 Draft Board</h1>
          <p className="text-xl text-gray-600">Complete draft results for all 12 teams</p>
        </div>

        {/* Round Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {rounds.map((round) => (
              <button
                key={round}
                onClick={() => setSelectedRound(round)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  selectedRound === round
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:shadow-md hover:scale-105'
                }`}
              >
                Round {round}
              </button>
            ))}
          </div>
        </div>

        {/* Draft Picks for Selected Round */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50 mb-12">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Users className="h-6 w-6 mr-2" />
              Round {selectedRound}
            </h2>
          </div>
          <div className="p-6">
            {getRoundPicks(selectedRound).length > 0 ? (
              <div className="grid gap-4">
                {getRoundPicks(selectedRound).map((pick) => (
                  <div key={`${pick.round}-${pick.pick}`} className="flex items-center justify-between p-6 border border-gray-200 rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-300 shadow-md hover:shadow-lg">
                    <div className="flex items-center space-x-6">
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                        {pick.pick}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg">{pick.team}</div>
                        <div className="text-sm text-gray-500">Pick {pick.pick}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 text-lg">{pick.player}</div>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold shadow-md ${getPositionColor(pick.position)}`}>
                        {pick.position}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No picks available for Round {selectedRound}</p>
                <p className="text-gray-400 mt-2">Draft picks will appear here once the draft is completed</p>
              </div>
            )}
          </div>
        </div>

        {/* Team Rosters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Team Rosters</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {teams.map((team, index) => {
                const teamPicks = getTeamPicks(team);
                const isExpanded = expandedTeams.has(team);
                
                return (
                  <div key={team} className="bg-gradient-to-r from-white to-gray-50 rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                    <button
                      onClick={() => toggleTeam(team)}
                      className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold shadow-lg">
                          {index + 1}
                        </div>
                        <div className="text-left">
                          <span className="font-bold text-gray-900 text-lg">{team}</span>
                          <div className="text-sm text-gray-500">{teamPicks.length} picks</div>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    
                    {isExpanded && (
                      <div className="px-6 pb-6">
                        <div className="space-y-3">
                          {teamPicks.length > 0 ? (
                            teamPicks.map((pick) => (
                              <div key={`${pick.round}-${pick.pick}`} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center space-x-3">
                                  <div className="bg-gray-100 text-gray-700 rounded-lg w-8 h-8 flex items-center justify-center font-bold text-sm">
                                    {pick.round}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-gray-900">{pick.player}</div>
                                    <div className="text-xs text-gray-500">Round {pick.round}, Pick {pick.pick}</div>
                                  </div>
                                </div>
                                <span className={`px-2 py-1 rounded-lg text-xs font-bold shadow-sm ${getPositionColor(pick.position)}`}>
                                  {pick.position}
                                </span>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              No picks yet for this team
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Draft;