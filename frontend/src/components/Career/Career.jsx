import { API_URL } from "../../config/api";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { careerPageStyles as s } from "../../assets/dummyStyles";
import { normalizeAssetUrl } from "../../utils/assetUrl";
import L1 from "../../assets/L1.png";
import L2 from "../../assets/L2.png";
import L3 from "../../assets/L3.png";
import L4 from "../../assets/L4.png";
import L5 from "../../assets/L5.png";
import L6 from "../../assets/L6.png";
import L7 from "../../assets/L7.png";
import L8 from "../../assets/L8.png";
import L9 from "../../assets/L9.png";
import L10 from "../../assets/L10.png";
import L11 from "../../assets/L11.png";
import L12 from "../../assets/L12.png";
import L13 from "../../assets/L13.png";

const fallbackCompanies = [
  L1,
  L2,
  L3,
  L4,
  L5,
  L6,
  L7,
  L8,
  L9,
  L10,
  L11,
  L12,
  L13,
].map((logo, index) => ({
  _id: `featured-${index}`,
  logo,
  name: "Featured company",
  website: "#",
}));

const Career = () => {
  const [companies, setCompanies] = useState([]);

  // fetch companies from backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/company`);
        setCompanies(
          res.data.companies?.length ? res.data.companies : fallbackCompanies,
        );
      } catch (error) {
        console.error("Error fetching companies:", error);
        setCompanies(fallbackCompanies);
      }
    };
    fetchCompanies();
  }, []);

  // Duplicate for seamless scroll
  const duplicatedCompanies = [...companies, ...companies];

  const fallbackLogo = (index) =>
    fallbackCompanies[index % fallbackCompanies.length].logo;

  // helper to detect external URL
  const isExternal = (url) => /^https?:\/\//i.test(url);

  return (
    <div className={s.pageContainer}>
      <div className={s.contentWrapper}>
        <div className={s.header}>
          <h1 className={s.headerTitle}>
            Join Our <span className={s.headerHighlight}>Featured</span>{" "}
            Companies
          </h1>
          <p className={s.headerSubtitle}>
            Discover exciting career opportunities with industry leaders who are
            actively hiring. Your next big role awaits!
          </p>
        </div>

        {/* First Row - Right to Left */}
        <div className={s.rowContainer}>
          <div className={s.scrollRowRightToLeft}>
            {duplicatedCompanies.map((company, index) => {
              const href = company.website || "#";
              return (
                <div key={`row1-${index}`} className={s.companyItem}>
                  <div className={s.companyInner}>
                    <a
                      href={href}
                      target={isExternal(href) ? "_blank" : undefined}
                      rel={isExternal(href) ? "noopener noreferrer" : undefined}
                      aria-label={`Open ${company.name}`}
                      className={s.logoLink}
                    >
                      <img
                        src={normalizeAssetUrl(company.logo) || fallbackLogo(index)}
                        alt={`${company.logo} logo`}
                        className={s.logoImage}
                        onError={(e) => {
                          if (
                            e.currentTarget.src !== fallbackLogo(index)
                          ) {
                            e.currentTarget.src = fallbackLogo(index);
                          }
                        }}
                      />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Second Row - Left to Right */}
        <div className={s.rowContainerLast}>
          <div className={s.scrollRowLeftToRight}>
            {duplicatedCompanies
              .slice()
              .reverse()
              .map((company, index) => {
                const href = company.website || "#";
                return (
                  <div
                    key={`row2-${index}`}
                    className={s.companyItemWithPadding}
                  >
                    <div className={s.companyInner}>
                      <a
                        href={href}
                        target={isExternal(href) ? "_blank" : undefined}
                        rel={
                          isExternal(href) ? "noopener noreferrer" : undefined
                        }
                        aria-label={`Open ${company.name}`}
                        className={s.logoLink}
                      >
                        <img
                          src={normalizeAssetUrl(company.logo) || fallbackLogo(index)}
                          alt={`${company.logo} logo`}
                          className={s.logoImage}
                          onError={(e) => {
                            if (
                              e.currentTarget.src !== fallbackLogo(index)
                            ) {
                              e.currentTarget.src = fallbackLogo(index);
                            }
                          }}
                        />
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style>{s.globalStyles}</style>
    </div>
  );
};

export default Career;
