import Header from "../../components/header/Header";
import TeamSection from "../../components/team/TeamSection";

export default function TeamPage() {
  return (
    <main>
      <Header/>
      <div className="py-8">
        <TeamSection />
      </div>
    </main>
  )
}

