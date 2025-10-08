import React from "react";
import type { IconProps } from "@phosphor-icons/react";
import { ArrowUpIcon, ArrowDownIcon } from "@phosphor-icons/react";

type Trend = "up" | "down" | "none";

type Props = {
  title: string;
  value: string | number;
  deltaPercent?: number;
  trend?: Trend;
  Icon: React.ComponentType<IconProps>;
  iconBgClassName?: string;
  iconClassName?: string;
  className?: string;
};

export default function StatsCard({
  title,
  value,
  deltaPercent,
  trend = "none",
  Icon,
  iconBgClassName = "bg-blue-100",
  iconClassName = "text-blue-500",
  className = "",
}: Props) {
  const trendColor = trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-400";
  const TrendIcon = trend === "up" ? ArrowUpIcon : trend === "down" ? ArrowDownIcon : null;

  return (
    <div className={`bg-white overflow-hidden shadow rounded-lg card-hover transition-slow ${className}`}>
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 p-3 rounded-lg ${iconBgClassName}`}>
            <Icon className={`w-6 h-6 ${iconClassName}`} />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline gap-2">
                <div className="text-2xl font-semibold text-gray-900">{value}</div>

                {trend !== "none" && typeof deltaPercent === "number" && (
                  <div className={`ml-2 flex items-baseline text-sm font-semibold ${trendColor}`}>
                    {TrendIcon && <TrendIcon className="w-3 h-3" />}
                    <span className="sr-only">{trend === "up" ? "Increased by" : "Decreased by"}</span>
                    {Math.abs(deltaPercent)}%
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
