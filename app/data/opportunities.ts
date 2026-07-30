import type { Opportunity } from '~/types/life'

export const OPPORTUNITIES: {
  time: Record<string, Opportunity[]>
  money: Record<string, Opportunity[]>
  skills: Record<string, Opportunity[]>
} = {
    time: {
      education: [
        { title: 'Volunteer Tutor',       desc: 'Help students build foundational reading and math skills.',        badge: 'Volunteer', url: 'https://www.literacyvolunteers.org' },
        { title: 'Mentor a Student',      desc: 'Guide a young person through school and key life decisions.',      badge: 'Volunteer', url: 'https://www.mentoring.org' },
        { title: 'Afterschool Programs',  desc: 'Spend a few hours a week supporting local youth activities.',      badge: 'Volunteer', url: 'https://www.afterschoolalliance.org' },
      ],
      environment: [
        { title: 'Local Cleanup',         desc: 'Organize or join community cleanup events in your area.',          badge: 'Volunteer', url: 'https://www.litterati.org' },
        { title: 'Tree Planting',         desc: 'Plant trees and restore green spaces with local groups.',          badge: 'Volunteer', url: 'https://www.arborday.org/programs/volunteers/' },
        { title: 'Conservation Corps',    desc: 'Hands-on habitat restoration with conservation organizations.',    badge: 'Volunteer', url: 'https://www.conservationcorps.org' },
      ],
      health: [
        { title: 'Crisis Text Line',      desc: 'Support people in crisis as a trained volunteer counselor.',       badge: 'Volunteer', url: 'https://www.crisistextline.org/volunteer' },
        { title: 'Hospital Volunteering', desc: 'Provide companionship and support at a local hospital.',           badge: 'Volunteer', url: 'https://www.volunteermatch.org' },
        { title: 'Food Bank',             desc: 'Sort and distribute food at a local food bank or pantry.',         badge: 'Volunteer', url: 'https://www.feedingamerica.org/take-action/volunteer' },
      ],
      community: [
        { title: 'Habitat for Humanity',  desc: 'Build and repair homes for families in need.',                     badge: 'Volunteer', url: 'https://www.habitat.org/volunteer' },
        { title: 'Animal Shelter',        desc: 'Walk dogs, socialize cats, and help animals find homes.',          badge: 'Volunteer', url: 'https://www.aspca.org/take-action/help-local-animals' },
        { title: 'Senior Companion',      desc: 'Visit and provide companionship to isolated older adults.',        badge: 'Volunteer', url: 'https://americorps.gov' },
      ],
      poverty: [
        { title: 'Homeless Shelter',      desc: 'Serve meals and support residents at a local shelter.',            badge: 'Volunteer', url: 'https://www.volunteermatch.org' },
        { title: 'Community Garden',      desc: 'Grow food for donation to local families in need.',                badge: 'Volunteer', url: 'https://www.communitygarden.org' },
        { title: 'Refugee Resettlement',  desc: 'Help newly arrived refugees navigate their new community.',        badge: 'Volunteer', url: 'https://www.rescue.org/volunteer' },
      ],
    },
    money: {
      education: [
        { title: 'DonorsChoose',          desc: 'Fund classroom projects and supplies directly for teachers.',      badge: 'Donate', url: 'https://www.donorschoose.org' },
        { title: 'Khan Academy',          desc: 'Support free, world-class education for anyone, anywhere.',       badge: 'Donate', url: 'https://www.khanacademy.org/donate' },
        { title: 'Room to Read',          desc: "Fund literacy programs and girls' education globally.",           badge: 'Donate', url: 'https://www.roomtoread.org/donate' },
      ],
      environment: [
        { title: 'The Nature Conservancy',desc: 'Protect lands and waters around the world.',                      badge: 'Donate', url: 'https://www.nature.org' },
        { title: 'One Tree Planted',      desc: 'Plant trees around the world for $1 each.',                      badge: 'Donate', url: 'https://onetreeplanted.org' },
        { title: 'Rainforest Trust',      desc: 'Purchase and protect critical tropical habitats.',                badge: 'Donate', url: 'https://www.rainforesttrust.org' },
      ],
      health: [
        { title: 'Doctors Without Borders', desc: 'Fund emergency medical care in crisis zones worldwide.',       badge: 'Donate', url: 'https://www.doctorswithoutborders.org/donate' },
        { title: "St. Jude Children's",   desc: 'Support free cancer treatment and research for children.',       badge: 'Donate', url: 'https://www.stjude.org/donate' },
        { title: 'Against Malaria Found.',desc: 'One of the most cost-effective ways to save lives.',             badge: 'Donate', url: 'https://www.againstmalaria.com' },
      ],
      community: [
        { title: 'Feeding America',       desc: 'Donate to your regional food bank network.',                     badge: 'Donate', url: 'https://www.feedingamerica.org' },
        { title: 'United Way',            desc: 'Invest in local nonprofits tackling education, health, income.', badge: 'Donate', url: 'https://www.unitedway.org' },
        { title: 'GoFundMe Charity',      desc: 'Browse and fund vetted community projects near you.',            badge: 'Donate', url: 'https://charity.gofundme.com' },
      ],
      poverty: [
        { title: 'GiveDirectly',          desc: 'Send cash directly to people living in extreme poverty.',        badge: 'Donate', url: 'https://www.givedirectly.org' },
        { title: 'Kiva',                  desc: 'Lend as little as $25 to entrepreneurs around the world.',      badge: 'Donate', url: 'https://www.kiva.org' },
        { title: 'Oxfam America',         desc: 'Fund long-term solutions to poverty and inequality.',            badge: 'Donate', url: 'https://www.oxfamamerica.org/donate/' },
      ],
    },
    skills: {
      education: [
        { title: 'Catchafire',            desc: 'Match your professional skills to nonprofits that need them.',   badge: 'Pro Bono', url: 'https://www.catchafire.org' },
        { title: 'Code.org',              desc: 'Teach computer science fundamentals to K–12 students.',         badge: 'Pro Bono', url: 'https://code.org/volunteer' },
        { title: 'Literacy Volunteers',   desc: 'Use teaching or communication skills to tutor adults.',         badge: 'Pro Bono', url: 'https://www.literacyvolunteers.org' },
      ],
      environment: [
        { title: 'Climate Draft',         desc: 'Apply your skills to climate solutions as a volunteer.',        badge: 'Pro Bono', url: 'https://www.climatedraft.org' },
        { title: 'OpenStreetMap',         desc: 'Map environmental data to support conservation efforts.',       badge: 'Pro Bono', url: 'https://www.openstreetmap.org/about' },
        { title: 'NRDC Pro Bono',         desc: 'Offer legal, science, or policy expertise to environmental orgs.', badge: 'Pro Bono', url: 'https://www.nrdc.org' },
      ],
      health: [
        { title: 'Health Leads',          desc: 'Connect patients to essential resources using your skills.',    badge: 'Pro Bono', url: 'https://healthleadsusa.org' },
        { title: 'Catchafire Health',     desc: 'Offer marketing, tech, or strategy to health nonprofits.',      badge: 'Pro Bono', url: 'https://www.catchafire.org' },
        { title: 'Remote Area Medical',   desc: 'Provide direct care or logistics support at free clinics.',     badge: 'Pro Bono', url: 'https://www.ramusa.org/volunteer/' },
      ],
      community: [
        { title: 'Taproot Foundation',    desc: 'Pro bono consulting for nonprofits in your city.',              badge: 'Pro Bono', url: 'https://www.taprootfoundation.org' },
        { title: 'Common Impact',         desc: 'Skills-based volunteering matched to your expertise.',          badge: 'Pro Bono', url: 'https://commonimpact.org' },
        { title: 'Idealist',              desc: 'Find skills-based volunteer roles at local nonprofits.',        badge: 'Pro Bono', url: 'https://www.idealist.org' },
      ],
      poverty: [
        { title: 'Pro Bono Net',          desc: 'Offer legal or professional skills to people in need.',        badge: 'Pro Bono', url: 'https://www.probono.net' },
        { title: 'Catchafire Poverty',    desc: 'Match your skills to nonprofits fighting poverty.',            badge: 'Pro Bono', url: 'https://www.catchafire.org' },
        { title: 'Kiva Fellows',          desc: 'Embed with microfinance partners to support borrowers.',       badge: 'Pro Bono', url: 'https://www.kiva.org/fellows' },
      ],
    },
  }
