"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const TRUST_ITEMS = [
  "100% Ori",
  "Gratis Ongkir",
  "Garansi Penukaran",
];

export function TrustRow() {
  return (
    <div className="flex items-center justify-center gap-4 px-4 py-2.5 bg-muted border-b border-border overflow-x-auto scrollbar-none">
      {TRUST_ITEMS.map((item, i) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.08 }}
          className="flex items-center gap-1.5 shrink-0"
        >
          <CheckCircle size={13} className="shrink-0 text-primary" />
          <span className="text-xs text-muted-foreground whitespace-nowrap font-medium">
            {item}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
