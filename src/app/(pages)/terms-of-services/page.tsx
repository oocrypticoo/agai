"use client";
import React, { useEffect, useState } from "react";
import { SplitString } from "@/app/utils/SplitString";
import { motion } from "framer-motion";
import Footer from "@/app/sections/Footer";

const page = () => {
  const [mounted, setMounted] = useState(false);

  const text1 = SplitString("Terms of Use");
  const text2 = SplitString("1. ACCEPTANCE OF TERMS");
  const text3 = SplitString("2. ELIGIBILITY");
  const text4 = SplitString("3. WEB3 ACCESS");
  const text5 = SplitString("4. UTILITY TOKEN DISCLOSURE");
  const text6 = SplitString("5. NO FINANCIAL OR LEGAL ADVICE");
  const text7 = SplitString("6. RISK DISCLOSURE");
  const text8 = SplitString("7. USER CONDUCT");
  const text9 = SplitString("8. THIRD-PARTY SERVICES");
  const text10 = SplitString("9. INTELLECTUAL PROPERTY");
  const text11 = SplitString("10. DISCLAIMER OF WARRANTIES");
  const text12 = SplitString("11. LIMITATION OF LIABILITY");
  const text13 = SplitString("12. MODIFICATIONS");
  const text14 = SplitString("13. GOVERNING LAW");
  const text15 = SplitString("14. CONTACT");
  const text16 = SplitString("15. PLATFORM PROGRESS");

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      <section className="py-25 sm:py-40 px-[20px] bg-white dark:bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="-ml-2 mb-10 font-degular-medium text-[60px] leading-[55px] sm:text-[70px] sm:leading-[65px] text-heading tracking-wide"
            style={{ textShadow: "2px 2px 40px #f8e2fe7c" }}
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.04, delayChildren: 0.5 }}
          >
            {text1.map((char: string, key: number) => (
              <motion.span
                key={key}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-1 text-[16px] text-text font-degular leading-relaxed tracking-wide"
          >
            Effective Date: August 1, 2025
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-10 text-[16px] text-text font-degular leading-relaxed tracking-wide"
          >
            Website: www.AGIAlpha.com
          </motion.p>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
          >
            {text2.map((char: string, key: number) => (
              <motion.span
                key={key}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            By accessing or using AGIAlpha.com (the "Site") and its related
            services (the "Services"), you agree to be bound by these Terms of
            Use ("Terms") and our Privacy Policy. If you do not agree, do not
            use the Site.
          </motion.p>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
          >
            {text3.map((char: string, key: number) => (
              <motion.span
                key={key}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            To use the Site, you must be at least 18 years old and have the
            legal capacity to enter into a binding agreement in your
            jurisdiction. By using this Site, you represent and warrant that you
            meet these requirements.
          </motion.p>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
          >
            {text4.map((char: string, key: number) => (
              <motion.span
                key={key}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            Access to Services may require the use of a non-custodial digital
            wallet (e.g., MetaMask). You are solely responsible for safeguarding
            your wallet, private keys, and assets. We do not store or manage
            user wallets and are not liable for loss or unauthorized access.
          </motion.p>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
          >
            {text5.map((char: string, key: number) => (
              <motion.span
                key={key}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            <p className="mb-5">
              The token referenced on this Site (the “Token”) is intended to
              function solely as a utility token that grants access to certain
              features, functions, or services within the AGI Alpha ecosystem.
              It is not intended to function as a security, investment contract,
              or financial product.
            </p>
            <ul className="mb-5 pl-10 list-disc">
              <li>
                The Token does not represent equity, debt, or ownership in AGI
                Alpha or any affiliated entity.
              </li>
              <li>
                No rights to profits, dividends, governance (unless otherwise
                stated), or liquidation proceeds are conferred by holding the
                Token.
              </li>
              <li>
                The Token is not offered for speculative purposes, and its value
                is derived solely from its utility within the protocol.
              </li>
              <li>
                The Token is not available to residents of jurisdictions where
                its use or purchase would be unlawful, including the United
                States unless such use is compliant with applicable laws.
              </li>
            </ul>
            <p>
              This disclosure is made in accordance with the regulatory
              framework of the Cayman Islands, where AGI Alpha is incorporated.
              Users are responsible for ensuring that participation is lawful
              under the laws of their own jurisdiction.
            </p>
          </motion.div>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
          >
            {text6.map((char: string, key: number) => (
              <motion.span
                key={key}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            All information provided is for informational and educational
            purposes only and does not constitute investment, financial, legal,
            or tax advice. The Site does not offer or facilitate any buying,
            selling, or recommendation of securities or financial products.
          </motion.p>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
          >
            {text7.map((char: string, key: number) => (
              <motion.span
                key={key}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            <p>
              Using Web3 technologies involves substantial risk. You acknowledge
              and agree that:
            </p>
            <ul className="mb-5 pl-10 list-disc">
              <li>Token values may fluctuate and lose all value</li>
              <li>Smart contracts may contain bugs or vulnerabilities</li>
              <li>
                Regulatory frameworks may evolve, affecting your use of the Site
                or Token
              </li>
            </ul>
            <p>
              You assume all risks associated with interacting with
              decentralized technologies.
            </p>
          </motion.div>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
          >
            {text8.map((char: string, key: number) => (
              <motion.span
                key={key}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            <p>You agree not to:</p>
            <ul className="mb-5 pl-10 list-disc">
              <li>Use the Site for any illegal or unauthorized purpose</li>
              <li>Interfere with the Site’s security or operations</li>
              <li>Upload malicious code or conduct phishing attacks</li>
              <li>Attempt to circumvent any protective mechanisms</li>
            </ul>
            <p>
              Violations may result in termination of your access and potential
              legal action.
            </p>
          </motion.div>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
          >
            {text9.map((char: string, key: number) => (
              <motion.span
                key={key}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            Our Site may link to or integrate with third-party services (e.g.,
            wallets, data providers). We do not control or endorse these
            services and are not responsible for any loss or damage caused by
            their use.
          </motion.p>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
          >
            {text10.map((char: string, key: number) => (
              <motion.span
                key={key}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            All content, branding, logos, smart contract code (unless
            open-sourced), and site design are the intellectual property of AGI
            Alpha or its licensors. Unauthorized reproduction or distribution is
            prohibited.
          </motion.p>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
          >
            {text11.map((char: string, key: number) => (
              <motion.span
                key={key}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            The Site and Services are provided “as is” and “as available”
            without warranties of any kind, express or implied. We do not
            guarantee that the Services will be error-free, uninterrupted, or
            secure.
          </motion.p>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
          >
            {text12.map((char: string, key: number) => (
              <motion.span
                key={key}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            To the maximum extent permitted by applicable law, AGI Alpha, its
            affiliates, directors, agents, and contributors shall not be liable
            for any indirect, incidental, special, or consequential damages,
            including but not limited to loss of funds, profits, or data.
          </motion.p>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
          >
            {text13.map((char: string, key: number) => (
              <motion.span
                key={key}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            We reserve the right to update these Terms at any time. Changes will
            be posted on this page with an updated Effective Date. Continued use
            after changes constitutes acceptance.
          </motion.p>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
          >
            {text14.map((char: string, key: number) => (
              <motion.span
                key={key}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            These Terms are governed by and construed in accordance with the
            laws of the Cayman Islands, without regard to conflict of law
            principles. Any dispute shall be subject to the exclusive
            jurisdiction of the courts of the Cayman Islands.
          </motion.p>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
          >
            {text15.map((char: string, key: number) => (
              <motion.span
                key={key}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            If you have any questions or concerns, please contact:
          </motion.p>

          <motion.h1
            className="mb-4 w-full text-[24px] leading-[24px] sm:text-[26px] sm:leading-[26px] font-degular-medium text-heading tracking-wide"
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01, delayChildren: 0.7 }}
          >
            {text16.map((char: string, key: number) => (
              <motion.span
                key={key}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mb-10 text-[16px] md:text-[18px] text-text font-degular leading-relaxed tracking-wide"
          >
            <p className="mb-5">
              The AGI Alpha platform, including its associated smart contracts,
              interfaces, and services, is currently under active development.
              While certain features are already functional and publicly
              accessible, other components remain in-progress and are being
              rolled out incrementally.
            </p>
            <p>You acknowledge and agree that:</p>
            <ul className="mb-5 pl-10 list-disc">
              <li>
                The platform has been partially built and may continue to
                evolve, change, or expand without prior notice.
              </li>
              <li>
                There is no guaranteed timeline or obligation for the completion
                of any particular feature, roadmap milestone, or service.
              </li>
              <li>
                All content and functionality is provided on an “as is” and “as
                available” basis, and the Foundation makes no representation or
                warranty regarding future development timelines or outcomes.
              </li>
            </ul>
            Your use of the Site and any related Services is at your own
            discretion and risk, based on the current state of the platform.
            Nothing in these Terms shall be construed as a promise or commitment
            to deliver a complete or finalized product.
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;
