import { API_URL } from "../../config/api";
// InterviewQuestionsPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, CircleArrowOutUpRight } from "lucide-react";
import { interviewQuestionsStyles as s } from "../../assets/dummyStyles";
import { normalizeAssetUrl } from "../../utils/assetUrl";
import IQ1 from "../../assets/IQ1.png";
import IQ2 from "../../assets/IQ2.png";
import IQ3 from "../../assets/IQ3.png";
import IQ4 from "../../assets/IQ4.png";
import IQ5 from "../../assets/IQ5.png";
import IQ6 from "../../assets/IQ6.png";
import IQ7 from "../../assets/IQ7.png";
import IQ8 from "../../assets/IQ8.png";
import IQR1 from "../../assets/IQR1.png";
import IQR2 from "../../assets/IQR2.png";
import IQR3 from "../../assets/IQR3.png";
import IQR4 from "../../assets/IQR4.png";
import IQR5 from "../../assets/IQR5.png";
import IQR6 from "../../assets/IQR6.png";

const fallbackCompanies = [
  [IQ1, "Amazon"],
  [IQ2, "Google"],
  [IQ3, "Microsoft"],
  [IQ4, "Salesforce"],
  [IQ5, "YouTube"],
  [IQ6, "SAP"],
  [IQ7, "Atlassian"],
  [IQ8, "HCLTech"],
].map(([logo, companyName], index) => ({
    _id: `featured-company-${index}`,
    companyName,
    logo,
    questionsCount: 0,
  }));

const fallbackRoles = [
  [IQR1, "Software Developer"],
  [IQR2, "Business Analyst"],
  [IQR3, "Interview Specialist"],
  [IQR4, "Data Analyst"],
  [IQR5, "Product Manager"],
  [IQR6, "Civil Engineer"],
].map(([image, roleName], index) => ({
    _id: `featured-role-${index}`,
    roleName,
    image,
    questionsCount: 0,
  }));

/* ---------- small helper ---------- */
const slugify = (str) =>
  str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

export default function InterviewQuestionsPage() {
  const [companies, setCompanies] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [companiesRes, rolesRes] = await Promise.all([
          fetch(`${API_URL}/api/interview/companies`),
          fetch(`${API_URL}/api/interview/roles`),
        ]);

        const companiesData = await companiesRes.json();
        const rolesData = await rolesRes.json();

        if (companiesData.success) {
          setCompanies(
            companiesData.companies.length
              ? companiesData.companies.slice(0, 8)
              : fallbackCompanies,
          );
        }
        if (rolesData.success) {
          setRoles(
            rolesData.roles.length ? rolesData.roles.slice(0, 8) : fallbackRoles,
          );
        }
      } catch (error) {
        console.error("Error fetching home page data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={s.loadingContainer}>
        <div className={s.spinner}></div>
      </div>
    );
  }

  return (
    <div className={s.pageContainer}>
      <div className={s.innerContainer}>
        <div className={s.mainGrid}>
          {/* LEFT: Companies */}
          <div>
            <section className={s.section}>
              <div className={s.sectionHeader}>
                <h2 className={s.sectionTitle}>
                  Interview questions by Company
                </h2>
                <Link to="/companies" className={s.viewAllLink}>
                  View all companies
                  <ChevronRight className={s.chevronIcon} />
                </Link>
              </div>

              <div className={s.companiesGrid}>
                {companies.map((company) => (
                  <CompanyCard company={company} key={company._id} />
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT: Roles */}
          <div>
            <section className={s.section}>
              <div className={s.sectionHeader}>
                <h2 className={s.sectionTitle}>Interview questions by Role</h2>
                <Link to="/roles" className={s.viewAllLink}>
                  View all roles
                  <ChevronRight className={s.chevronIcon} />
                </Link>
              </div>

              <div className={s.rolesGrid}>
                {roles.map((role) => (
                  <RoleCard role={role} key={role._id} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Company card ---------- */
function CompanyCard({ company }) {
  const [imgError, setImgError] = useState(false);
  const initials = company.companyName
    ? company.companyName
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
    : "??";

  const colorClass = s.getColorClass("company", company.companyName);

  return (
    <Link
      to={`/companies/${company._id}`}
      state={{ companyId: company._id }}
      className={s.cardLink}
    >
      <div className={s.cardGlow}></div>

      <article className={s.cardArticle}>
        <div className={s.cardFlex}>
          <div className={s.cardLeftFlex}>
            <div
              className={s.logoContainer(colorClass)}
              style={{ width: 56, height: 56, overflow: "hidden" }}
            >
              {!imgError && company.logo ? (
                <img
                  src={normalizeAssetUrl(company.logo)}
                  alt={`${company.companyName} logo`}
                  onError={() => setImgError(true)}
                  className={s.logoImage}
                />
              ) : (
                <span className={s.logoFallbackText}>{initials}</span>
              )}
            </div>

            <div>
              <h3 className={s.cardTitle}>{company.companyName}</h3>
              <p className={s.cardSubtitle}>
                {company.questionsCount || "0"} Interviews
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <CircleArrowOutUpRight className={s.cardIcon} />
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ---------- Role card ---------- */
function RoleCard({ role }) {
  const [imgError, setImgError] = useState(false);
  const initials = role.roleName
    ? role.roleName
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
    : "??";

  const colorClass = s.getColorClass("role", role.roleName);
  const slug = slugify(role.roleName);

  return (
    <Link
      to={`/roles/${slug}`}
      state={{ selectedRoleSlug: slug }}
      className={s.cardLink}
    >
      <div className={s.roleCardGlow}></div>

      <article className={s.cardArticle}>
        <div className={s.cardFlex}>
          <div className={s.cardLeftFlex}>
            <div
              className={s.logoContainer(colorClass)}
              style={{ width: 56, height: 56, overflow: "hidden" }}
            >
              {!imgError && role.image ? (
                <img
                  src={normalizeAssetUrl(role.image)}
                  alt={`${role.roleName} logo`}
                  onError={() => setImgError(true)}
                  className={s.logoImage}
                />
              ) : (
                <span className={s.logoFallbackText}>{initials}</span>
              )}
            </div>

            <div>
              <h3 className={s.cardTitle}>{role.roleName}</h3>
              <p className={s.cardSubtitle}>
                {role.questionsCount || "0"} Questions
              </p>
            </div>
          </div>

          <div>
            <CircleArrowOutUpRight className={s.cardIcon} />
          </div>
        </div>
      </article>
    </Link>
  );
}
