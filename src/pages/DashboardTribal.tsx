import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trees, User, LogOut, MapPin, Bell, Leaf, CheckCircle, XCircle, Droplets, Sun, Wind, ChevronRight, FileText, Home, Settings, HelpCircle, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import indiaMap from "@/assets/india-map.png";

interface UserData {
  type: "tribal" | "government";
  name: string;
  aadhaar?: string;
}

const landParcels = [
  { id: "L-001", area: "4.2 acres", location: "Khunti, Jharkhand", sanctioned: true, date: "12 Mar 2024", type: "IFR" },
  { id: "L-002", area: "2.8 acres", location: "Ranchi, Jharkhand", sanctioned: false, date: "Pending review", type: "IFR" },
  { id: "L-003", area: "1.5 acres", location: "Gumla, Jharkhand", sanctioned: true, date: "05 Jan 2024", type: "CFR" },
];

const resources = [
  { name: "Water Availability", icon: Droplets, level: 72, status: "Adequate", trend: "+4%", tone: "blue" },
  { name: "Sunlight Exposure", icon: Sun, level: 88, status: "High", trend: "+1%", tone: "amber" },
  { name: "Wind Patterns", icon: Wind, level: 45, status: "Moderate", trend: "−3%", tone: "neutral" },
  { name: "Forest Cover", icon: Leaf, level: 63, status: "Good", trend: "+2%", tone: "forest" },
];

const DashboardTribal = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("fra_user");
    if (!stored) { navigate("/"); return; }
    const parsed = JSON.parse(stored);
    if (parsed.type !== "tribal") { navigate("/"); return; }
    setUser(parsed);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("fra_user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-cream/40 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col gradient-forest text-cream sticky top-0 h-screen">
        <div className="p-6 border-b border-cream/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-amber flex items-center justify-center">
              <Trees className="h-5 w-5 text-forest-dark" />
            </div>
            <div className="leading-tight">
              <p className="font-display text-base font-bold text-cream">FRA DigiMap</p>
              <p className="text-[10px] uppercase tracking-widest text-cream/50">Tribal Portal</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { icon: Home, label: "Dashboard", active: true },
            { icon: MapPin, label: "My Lands" },
            { icon: FileText, label: "Claims & Documents" },
            { icon: Leaf, label: "Resources" },
            { icon: Calendar, label: "Notifications" },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                item.active ? "bg-amber/15 text-amber border-l-2 border-amber" : "text-cream/70 hover:bg-cream/5 hover:text-cream"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-cream/10 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-cream/70 hover:bg-cream/5 hover:text-cream transition-colors">
            <Settings className="h-4 w-4" /> Settings
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-cream/70 hover:bg-cream/5 hover:text-cream transition-colors">
            <HelpCircle className="h-4 w-4" /> Help
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Topbar */}
        <header className="bg-background border-b border-border sticky top-0 z-40">
          <div className="px-6 lg:px-10 h-16 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Tribal Portal</p>
              <h1 className="font-display text-lg font-semibold text-foreground leading-tight">Citizen Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber" />
              </Button>
              <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-border">
                <div className="text-right leading-tight">
                  <p className="text-sm font-semibold text-foreground">{user.name}</p>
                  <p className="text-[11px] text-muted-foreground font-mono">{user.aadhaar || "XXXX-XXXX-1234"}</p>
                </div>
                <div className="w-9 h-9 rounded-full gradient-forest flex items-center justify-center ring-2 ring-amber/30">
                  <User className="h-4 w-4 text-amber" />
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-10 space-y-8 max-w-[1400px]">
          {/* Greeting / hero card */}
          <div className="relative gradient-forest rounded-2xl overflow-hidden shadow-elevated">
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="relative p-8 md:p-10 grid md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <p className="text-xs uppercase tracking-[0.2em] text-amber mb-3">— Namaste</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-cream leading-tight mb-3 text-balance">
                  Welcome back, <span className="italic font-medium text-amber">{user.name.split(" ")[0]}.</span>
                </h2>
                <p className="text-cream/70 max-w-md leading-relaxed">
                  Your forest rights claims are protected and tracked here. View land status, monitor resources, and file new claims.
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                  <Badge className="bg-amber/15 text-amber border-amber/30 hover:bg-amber/20 font-medium">Scheduled Tribe · Munda</Badge>
                  <Badge className="bg-cream/10 text-cream border-cream/20 hover:bg-cream/15">Khunti District</Badge>
                  <Badge className="bg-cream/10 text-cream border-cream/20 hover:bg-cream/15">Jharkhand</Badge>
                </div>
              </div>
              <div className="bg-cream/10 backdrop-blur-sm border border-cream/15 rounded-xl p-6">
                <p className="text-xs uppercase tracking-widest text-cream/60 mb-2">Total Land Holding</p>
                <p className="font-display text-5xl font-bold text-cream leading-none">8.5</p>
                <p className="text-cream/60 text-sm mt-1">acres · 3 parcels</p>
                <div className="mt-4 pt-4 border-t border-cream/10 flex items-center justify-between text-xs">
                  <span className="text-cream/60">Sanctioned</span>
                  <span className="font-mono font-semibold text-green-300">5.7 / 8.5 ac</span>
                </div>
              </div>
            </div>
          </div>

          {/* KPI strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Active Claims", value: "3", note: "All in review window", icon: FileText },
              { label: "Sanctioned", value: "2", note: "5.7 acres approved", icon: CheckCircle, tone: "green" },
              { label: "Pending", value: "1", note: "Avg. 14 days remaining", icon: XCircle, tone: "amber" },
              { label: "Resource Score", value: "67%", note: "Land productivity index", icon: TrendingUp, tone: "forest" },
            ].map((s) => (
              <Card key={s.label} className="shadow-card border-border hover:shadow-elevated transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{s.label}</p>
                    <s.icon className={`h-4 w-4 ${s.tone === "green" ? "text-green-600" : s.tone === "amber" ? "text-amber" : s.tone === "forest" ? "text-forest" : "text-muted-foreground"}`} />
                  </div>
                  <p className="font-display text-3xl font-bold text-foreground leading-none">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-2">{s.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Map + Land Status */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 shadow-card border-border overflow-hidden">
              <CardHeader className="pb-3 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-display text-lg flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-forest" />
                      Geo-located Land Parcels
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">Hover markers to view parcel details</p>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px]">SRS · WGS-84</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-cream/50 to-muted/40 grid-pattern flex items-center justify-center min-h-[460px]">
                  <img src={indiaMap} alt="India Map" className="h-[420px] object-contain opacity-95 drop-shadow-lg" />
                  <div className="absolute group cursor-pointer" style={{ top: "42%", left: "32%" }}>
                    <div className="relative">
                      <div className="absolute -inset-2 bg-forest/30 rounded-full animate-ping" />
                      <div className="relative w-4 h-4 rounded-full bg-forest border-2 border-cream shadow-lg" />
                    </div>
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-forest-dark text-cream text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-elevated">
                      <span className="font-semibold">Khunti</span> · 4.2 acres · <span className="text-green-300">Sanctioned</span>
                    </div>
                  </div>
                  <div className="absolute group cursor-pointer" style={{ top: "40%", left: "34%" }}>
                    <div className="relative">
                      <div className="absolute -inset-2 bg-amber/30 rounded-full animate-ping" />
                      <div className="relative w-4 h-4 rounded-full bg-amber border-2 border-cream shadow-lg" />
                    </div>
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-forest-dark text-cream text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-elevated">
                      <span className="font-semibold">Ranchi</span> · 2.8 acres · <span className="text-amber">Pending</span>
                    </div>
                  </div>

                  {/* Map legend */}
                  <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur border border-border rounded-lg px-3 py-2 shadow-card">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Legend</p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-forest" /> Sanctioned</span>
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber" /> Pending</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border">
              <CardHeader className="pb-3 border-b border-border">
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-forest" />
                  Sanction Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {landParcels.map((land) => (
                    <div key={land.id} className="p-4 rounded-lg border border-border bg-card hover:border-forest/30 hover:shadow-card transition-all cursor-pointer group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-foreground">{land.id}</span>
                          <Badge variant="outline" className="text-[10px] font-mono px-1.5 py-0">{land.type}</Badge>
                        </div>
                        {land.sanctioned ? (
                          <Badge className="bg-green-50 text-green-700 border-green-200 gap-1 text-[10px] font-medium">
                            <CheckCircle className="h-2.5 w-2.5" /> Sanctioned
                          </Badge>
                        ) : (
                          <Badge className="bg-amber/10 text-amber border-amber/30 gap-1 text-[10px] font-medium">
                            <XCircle className="h-2.5 w-2.5" /> Pending
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-medium text-foreground">{land.location}</p>
                      <div className="flex justify-between mt-2 pt-2 border-t border-border/60">
                        <span className="text-xs text-muted-foreground">{land.area}</span>
                        <span className="text-xs text-muted-foreground font-mono">{land.date}</span>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-3 border-dashed text-muted-foreground hover:text-forest hover:border-forest">
                    File New Claim <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resources */}
          <Card className="shadow-card border-border">
            <CardHeader className="pb-3 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-display text-lg flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-forest" />
                    Land Resource Index
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">Updated from satellite imagery · {new Date().toLocaleDateString("en-IN")}</p>
                </div>
                <Badge variant="outline" className="font-mono text-[10px]">ISRO · Bhuvan</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {resources.map((res) => (
                  <div key={res.name} className="space-y-3 p-4 rounded-lg bg-cream/40 border border-border">
                    <div className="flex items-center justify-between">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        res.tone === "blue" ? "bg-blue-50 text-blue-600" :
                        res.tone === "amber" ? "bg-amber/10 text-amber" :
                        res.tone === "forest" ? "bg-forest/10 text-forest" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        <res.icon className="h-4 w-4" />
                      </div>
                      <span className={`text-xs font-mono font-semibold ${res.trend.startsWith("+") ? "text-green-600" : "text-destructive"}`}>{res.trend}</span>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">{res.name}</p>
                      <div className="flex items-baseline justify-between">
                        <p className="font-display text-2xl font-bold text-foreground">{res.level}<span className="text-sm font-normal text-muted-foreground">%</span></p>
                        <span className="text-xs text-muted-foreground">{res.status}</span>
                      </div>
                    </div>
                    <Progress value={res.level} className="h-1.5" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardTribal;
