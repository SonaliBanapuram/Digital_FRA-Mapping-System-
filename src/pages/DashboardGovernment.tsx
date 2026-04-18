import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, LogOut, MapPin, Bell, Users, CheckCircle, XCircle, Clock, Search, Home, FileText, BarChart3, Settings, HelpCircle, TrendingUp, TrendingDown, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import indiaMap from "@/assets/india-map.png";

interface UserData {
  type: "tribal" | "government";
  name: string;
}

const regionData = [
  { name: "Jharkhand", population: 3240, sanctioned: 2100, pending: 840, rejected: 300 },
  { name: "Chhattisgarh", population: 2870, sanctioned: 1900, pending: 670, rejected: 300 },
  { name: "Odisha", population: 2150, sanctioned: 1400, pending: 500, rejected: 250 },
  { name: "Maharashtra", population: 1890, sanctioned: 1200, pending: 440, rejected: 250 },
  { name: "Madhya Pradesh", population: 1620, sanctioned: 1050, pending: 370, rejected: 200 },
];

const tribalMembers = [
  { id: "T-001", name: "Ramesh Munda", aadhaar: "XXXX-XXXX-1234", district: "Khunti", state: "Jharkhand", lands: 3, sanctioned: 2, status: "Active" },
  { id: "T-002", name: "Sita Oraon", aadhaar: "XXXX-XXXX-5678", district: "Gumla", state: "Jharkhand", lands: 2, sanctioned: 2, status: "Active" },
  { id: "T-003", name: "Birsa Hembram", aadhaar: "XXXX-XXXX-9012", district: "Dantewada", state: "Chhattisgarh", lands: 4, sanctioned: 1, status: "Pending" },
  { id: "T-004", name: "Lakshmi Gond", aadhaar: "XXXX-XXXX-3456", district: "Koraput", state: "Odisha", lands: 1, sanctioned: 0, status: "Pending" },
  { id: "T-005", name: "Suraj Bhil", aadhaar: "XXXX-XXXX-7890", district: "Nandurbar", state: "Maharashtra", lands: 2, sanctioned: 1, status: "Active" },
  { id: "T-006", name: "Meena Santhal", aadhaar: "XXXX-XXXX-2345", district: "Godda", state: "Jharkhand", lands: 3, sanctioned: 3, status: "Active" },
  { id: "T-007", name: "Karan Munda", aadhaar: "XXXX-XXXX-6789", district: "Ranchi", state: "Jharkhand", lands: 1, sanctioned: 0, status: "Rejected" },
  { id: "T-008", name: "Priya Baiga", aadhaar: "XXXX-XXXX-0123", district: "Mandla", state: "Madhya Pradesh", lands: 2, sanctioned: 1, status: "Active" },
];

const mapHotspots = [
  { top: "42%", left: "30%", label: "Jharkhand", count: "3,240", size: "lg" },
  { top: "52%", left: "33%", label: "Chhattisgarh", count: "2,870", size: "lg" },
  { top: "58%", left: "30%", label: "Odisha", count: "2,150", size: "md" },
  { top: "48%", left: "22%", label: "Maharashtra", count: "1,890", size: "md" },
  { top: "38%", left: "26%", label: "M.P.", count: "1,620", size: "sm" },
];

const DashboardGovernment = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("fra_user");
    if (!stored) { navigate("/"); return; }
    const parsed = JSON.parse(stored);
    if (parsed.type !== "government") { navigate("/"); return; }
    setUser(parsed);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("fra_user");
    navigate("/");
  };

  const filteredMembers = tribalMembers.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPopulation = regionData.reduce((a, r) => a + r.population, 0);
  const totalSanctioned = regionData.reduce((a, r) => a + r.sanctioned, 0);
  const totalPending = regionData.reduce((a, r) => a + r.pending, 0);
  const totalRejected = regionData.reduce((a, r) => a + r.rejected, 0);
  const sanctionRate = ((totalSanctioned / (totalSanctioned + totalPending + totalRejected)) * 100).toFixed(1);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-cream/40 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col gradient-forest text-cream sticky top-0 h-screen">
        <div className="p-6 border-b border-cream/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-amber flex items-center justify-center">
              <Shield className="h-5 w-5 text-forest-dark" />
            </div>
            <div className="leading-tight">
              <p className="font-display text-base font-bold text-cream">FRA DigiMap</p>
              <p className="text-[10px] uppercase tracking-widest text-cream/50">Officer Portal</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { icon: Home, label: "Overview", active: true },
            { icon: MapPin, label: "GIS Atlas" },
            { icon: Users, label: "Beneficiaries" },
            { icon: FileText, label: "Claims Review" },
            { icon: BarChart3, label: "Analytics" },
            { icon: Bell, label: "Alerts" },
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

      <main className="flex-1 min-w-0">
        {/* Topbar */}
        <header className="bg-background border-b border-border sticky top-0 z-40">
          <div className="px-6 lg:px-10 h-16 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Officer Portal</p>
              <h1 className="font-display text-lg font-semibold text-foreground leading-tight">National Overview</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="hidden md:inline-flex">
                <Download className="h-3.5 w-3.5 mr-1.5" /> Export Report
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber" />
              </Button>
              <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-border">
                <div className="text-right leading-tight">
                  <p className="text-sm font-semibold text-foreground">{user.name}</p>
                  <p className="text-[11px] text-muted-foreground">District Collector · IAS</p>
                </div>
                <div className="w-9 h-9 rounded-full gradient-forest flex items-center justify-center ring-2 ring-amber/30">
                  <Shield className="h-4 w-4 text-amber" />
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-10 space-y-8 max-w-[1500px]">
          {/* Header card */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest mb-2">— Live Snapshot</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-balance leading-tight">
                Forest Rights at a glance.
              </h2>
              <p className="text-muted-foreground mt-2">Updated {new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-[10px] py-1.5 px-2.5">FY 2024–25</Badge>
              <Badge className="bg-green-50 text-green-700 border-green-200 font-mono text-[10px] py-1.5 px-2.5 gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> SYSTEM HEALTHY
              </Badge>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Tribal Population", value: totalPopulation.toLocaleString("en-IN"), delta: "+2.4%", up: true, icon: Users, tone: "forest" },
              { label: "Lands Sanctioned", value: totalSanctioned.toLocaleString("en-IN"), delta: `${sanctionRate}% rate`, up: true, icon: CheckCircle, tone: "green" },
              { label: "Pending Review", value: totalPending.toLocaleString("en-IN"), delta: "+128 today", up: false, icon: Clock, tone: "amber" },
              { label: "Rejected", value: totalRejected.toLocaleString("en-IN"), delta: "−3.1%", up: true, icon: XCircle, tone: "red" },
            ].map((s) => (
              <Card key={s.label} className="shadow-card border-border hover:shadow-elevated transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{s.label}</p>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      s.tone === "forest" ? "bg-forest/10 text-forest" :
                      s.tone === "green" ? "bg-green-50 text-green-600" :
                      s.tone === "amber" ? "bg-amber/10 text-amber" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      <s.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="font-display text-3xl font-bold text-foreground leading-none">{s.value}</p>
                  <div className="flex items-center gap-1.5 mt-3 text-xs">
                    {s.up ? <TrendingUp className="h-3 w-3 text-green-600" /> : <TrendingDown className="h-3 w-3 text-amber" />}
                    <span className={`font-mono font-semibold ${s.up ? "text-green-600" : "text-amber"}`}>{s.delta}</span>
                    <span className="text-muted-foreground">vs last quarter</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Map + Region */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 shadow-card border-border overflow-hidden">
              <CardHeader className="pb-3 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-display text-lg flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-forest" />
                      Tribal Population — Heat Map
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">Marker size indicates beneficiary density</p>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px]">SOI · 2024</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-cream/50 to-muted/40 grid-pattern flex items-center justify-center min-h-[520px]">
                  <img src={indiaMap} alt="India Map" className="h-[480px] object-contain opacity-95 drop-shadow-lg" />
                  {mapHotspots.map((dot, i) => {
                    const sizeClass = dot.size === "lg" ? "w-6 h-6" : dot.size === "md" ? "w-5 h-5" : "w-4 h-4";
                    return (
                      <div key={i} className="absolute group cursor-pointer" style={{ top: dot.top, left: dot.left }}>
                        <div className="relative">
                          <div className="absolute -inset-2 bg-amber/30 rounded-full animate-ping" />
                          <div className={`relative ${sizeClass} rounded-full bg-amber border-2 border-cream shadow-lg`} />
                        </div>
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-forest-dark text-cream text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-elevated">
                          <span className="font-semibold">{dot.label}</span> · <span className="font-mono text-amber">{dot.count}</span>
                        </div>
                      </div>
                    );
                  })}

                  <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur border border-border rounded-lg px-4 py-3 shadow-card">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Density</p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber" /> &lt;1K</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber" /> 1–2.5K</span>
                      <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-amber" /> &gt;2.5K</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border">
              <CardHeader className="pb-3 border-b border-border">
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-forest" />
                  State-wise Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {regionData.map((region) => {
                    const pct = (region.sanctioned / region.population) * 100;
                    return (
                      <div key={region.name} className="p-4 rounded-lg border border-border bg-card hover:border-forest/30 hover:shadow-card transition-all cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-foreground">{region.name}</span>
                          <span className="text-xs font-mono text-muted-foreground">{region.population.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-2">
                          <div className="h-full gradient-amber rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="flex gap-1.5 text-[10px] flex-wrap">
                          <Badge className="bg-green-50 text-green-700 border-green-200 px-1.5 py-0 font-mono">✓ {region.sanctioned}</Badge>
                          <Badge className="bg-amber/10 text-amber border-amber/30 px-1.5 py-0 font-mono">⏳ {region.pending}</Badge>
                          <Badge className="bg-destructive/10 text-destructive border-destructive/20 px-1.5 py-0 font-mono">✕ {region.rejected}</Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Directory */}
          <Card className="shadow-card border-border">
            <CardHeader className="pb-3 border-b border-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="font-display text-lg flex items-center gap-2">
                    <Users className="h-4 w-4 text-forest" />
                    Beneficiary Directory
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">{filteredMembers.length} of {tribalMembers.length} records</p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search name, district, state…"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 h-9"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter className="h-3.5 w-3.5 mr-1.5" /> Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-cream/40 hover:bg-cream/40">
                    <TableHead className="text-[10px] uppercase tracking-wider font-semibold">ID</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider font-semibold">Beneficiary</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider font-semibold hidden md:table-cell">Aadhaar</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider font-semibold">District</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider font-semibold hidden sm:table-cell">State</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider font-semibold text-center">Lands</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider font-semibold text-center">Sanctioned</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider font-semibold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id} className="cursor-pointer hover:bg-cream/30">
                      <TableCell className="font-mono text-xs font-semibold text-foreground">{member.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center text-xs font-semibold text-forest">
                            {member.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <span className="font-medium text-foreground">{member.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground font-mono text-xs">{member.aadhaar}</TableCell>
                      <TableCell className="text-foreground">{member.district}</TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">{member.state}</TableCell>
                      <TableCell className="text-center font-mono text-sm">{member.lands}</TableCell>
                      <TableCell className="text-center">
                        <span className="font-mono text-sm">
                          <span className="text-green-600 font-semibold">{member.sanctioned}</span>
                          <span className="text-muted-foreground">/{member.lands}</span>
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-[10px] font-medium ${
                          member.status === "Active" ? "bg-green-50 text-green-700 border-green-200" :
                          member.status === "Pending" ? "bg-amber/10 text-amber border-amber/30" :
                          "bg-destructive/10 text-destructive border-destructive/20"
                        }`}>
                          {member.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardGovernment;
