// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import SearchField from "../SearchField/SearchField";
// import { useState, useEffect } from "react";

// import { getCities } from "@/app/lib/api";
// import css from "./NoticesFilters.module.css";
// import Select from "react-select";

// import Image from "next/image";
// import { components } from "react-select";
// import type { DropdownIndicatorProps } from "react-select";
// import type { StylesConfig } from "react-select";
// import type { ControlProps } from "react-select";

// type Props = {
//   basePath?: string;
// };
// type CityOption = {
//   value: string;
//   label: string;
// };
// const CATEGORIES = ["found", "free", "lost", "sell"];
// const SEXES = ["female", "male", "multiple", "unknown"];
// const SPECIES = [
//   "dog",
//   "cat",
//   "monkey",
//   "bird",
//   "snake",
//   "turtle",
//   "lizard",
//   "frog",
//   "fish",
//   "ants",
//   "bees",
//   "butterfly",
//   "spider",
//   "scorpion",
// ];

// export default function NoticesFilters({ basePath = "/notices" }: Props) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const query = searchParams.get("query") ?? "";
//   const category = searchParams.get("category") ?? "";
//   const sex = searchParams.get("sex") ?? "";
//   const species = searchParams.get("species") ?? "";
//   const sort = searchParams.get("sort") ?? "popularity";

//   const location = searchParams.get("location") ?? "";
//   const [cities, setCities] = useState<CityOption[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isClient, setIsClient] = useState(false);

//   const categoryOptions = CATEGORIES.map((item) => ({
//     value: item,
//     label: item,
//   }));

//   const sexOptions = SEXES.map((item) => ({
//     value: item,
//     label: item.charAt(0).toUpperCase() + item.slice(1), // первая буква заглавная
//   }));

//   const speciesOptions = SPECIES.map((item) => ({
//     value: item,
//     label: item.charAt(0).toUpperCase() + item.slice(1),
//   }));

//   const DropdownIndicator = (
//     props: DropdownIndicatorProps<CityOption, false>,
//   ) => (
//     <components.DropdownIndicator {...props}>
//       <Image
//         src="/chevron-down.svg"
//         width={18}
//         height={18}
//         alt="chevron-icon"
//       />
//     </components.DropdownIndicator>
//   );

//   const selectStyles: StylesConfig<CityOption, false> = {
//     control: (base) => ({
//       ...base,
//       backgroundColor: "var(--white-color)",
//       border: "none",
//       borderRadius: 30,
//       padding: "12px 12px",
//       width: 143,
//       minHeight: "auto",
//       boxShadow: "none",
//       cursor: "pointer",

//       fontFamily: "Manrope",
//       fontWeight: 500,
//       fontSize: 14,
//       lineHeight: "1.2",
//       letterSpacing: "-0.03em",
//       color: "var(--title-color)",

//       "&:hover": {
//         color: "var(--accent-color)",
//       },
//     }),

//     indicatorSeparator: () => ({ display: "none" }),
//     dropdownIndicator: (base) => ({
//       ...base,
//       padding: 0,
//     }),

//     menu: (base) => ({
//       ...base,
//       backgroundColor: "var(--white-color)",
//       borderRadius: 15,
//       width: 143,
//     }),

//     option: (base, state) => ({
//       ...base,
//       backgroundColor: state.isFocused ? "transparent" : "var(--white-color)",
//       color: state.isFocused ? "var(--accent-color)" : "inherit",
//       fontFamily: "Manrope, sans-serif",
//       fontWeight: 500,
//       fontSize: 14,
//       "::first-letter": {
//         textTransform: "uppercase",
//       },
//     }),

//     singleValue: (base) => ({
//       ...base,
//       textTransform: "lowercase",
//       "::first-letter": {
//         textTransform: "uppercase",
//       },
//     }),
//   };

//   const ControlWithSearchIcon = (props: ControlProps<CityOption, false>) => (
//     <components.Control {...props}>
//       <Image
//         src="/search.svg"
//         alt="search"
//         width={16}
//         height={16}
//         style={{ marginRight: 0 }}
//       />
//       {props.children}
//     </components.Control>
//   );

//   const citySelectStyles: StylesConfig<CityOption, false> = {
//     control: (base) => ({
//       ...base,
//       backgroundColor: "var(--white-color)",
//       border: "none",
//       borderRadius: 30,
//       padding: "12px", // оставляем место слева под иконку
//       width: 295,
//       minHeight: "auto",
//       boxShadow: "none",
//       cursor: "text",
//       fontFamily: "Manrope",
//       fontWeight: 500,
//       fontSize: 14,
//       lineHeight: "1.2",
//       letterSpacing: "-0.03em",
//       position: "relative", // чтобы позиционировать иконку
//       flexDirection: "row-reverse",
//     }),
//     menu: (base) => ({
//       ...base,
//       width: 295,
//       borderRadius: 15,
//       backgroundColor: "var(--white-color)",
//     }),
//     option: (base, state) => ({
//       ...base,
//       backgroundColor: state.isFocused ? "transparent" : "var(--white-color)",
//       color: state.isFocused ? "var(--accent-color)" : "inherit",
//       fontFamily: "Manrope, sans-serif",
//       fontWeight: 500,
//       fontSize: 14,
//       textTransform: "capitalize",
//     }),
//     singleValue: (base) => ({
//       ...base,
//       fontFamily: "Manrope, sans-serif",
//       fontWeight: 500,
//       fontSize: 14,
//       textTransform: "capitalize",
//     }),
//     indicatorSeparator: () => ({ display: "none" }),
//     dropdownIndicator: () => ({ display: "none" }),
//     noOptionsMessage: (base) => ({
//       ...base,
//       color: "var(--accent-color)",
//       fontFamily: "Manrope, sans-serif",
//       fontWeight: 500,
//       fontSize: 14,
//       textAlign: "center",
//     }),
//   };

//   useEffect(() => setIsClient(true), []);

//   const fetchCities = async (search: string) => {
//     setIsLoading(true);
//     try {
//       const data = await getCities(search); // City[]
//       setCities(
//         data.map((city) => ({
//           value: city.cityEn,
//           label: `${city.cityEn}, ${city.countyEn}, ${city.stateEn}`,
//         })),
//       );
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const updateParam = (key: string, value: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("page", "1");

//     if (value) params.set(key, value);
//     else params.delete(key);

//     router.replace(`${basePath}?${params.toString()}`);
//   };

//   const updateQuery = (value: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("page", "1");

//     if (value) params.set("query", value);
//     else params.delete("query");

//     router.replace(`${basePath}?${params.toString()}`);
//   };

//   const submitSearch = () => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("page", "1");

//     if (query) params.set("query", query);
//     else params.delete("query");

//     router.push(`${basePath}?${params.toString()}`);
//   };

//   return (
//     <div className={css.noticesFilters}>
//       <div className={css.noticesSearchFieldWrapp}>
//         <SearchField
//           value={query}
//           onChangeAction={updateQuery}
//           onSubmitAction={submitSearch}
//           placeholder="Search"
//           className={css.noticesSearchField}
//         />
//       </div>
//       <div className={css.categorySexSelectsWrapper}>
//         {/* Category */}
//         {isClient && (
//           <Select
//             instanceId="category-select"
//             options={categoryOptions}
//             placeholder="Category"
//             value={categoryOptions.find((o) => o.value === category) || null}
//             onChange={(option) =>
//               updateParam("category", option ? option.value : "")
//             }
//             styles={selectStyles}
//             components={{ DropdownIndicator }}
//             isSearchable={false}
//             className={css.noticesSelect}
//             classNamePrefix="notices"
//           />
//         )}
//         {/* Sex */}
//         {isClient && (
//           <Select
//             instanceId="sex-select"
//             options={sexOptions}
//             placeholder="By gender"
//             value={sexOptions.find((o) => o.value === sex) || null}
//             onChange={(option) =>
//               updateParam("sex", option ? option.value : "")
//             }
//             styles={selectStyles}
//             components={{ DropdownIndicator }}
//             isSearchable={false}
//             className={css.sexesSelect}
//             classNamePrefix="sexes"
//           />
//         )}
//       </div>
//       {/* Species */}
//       {isClient && (
//         <Select
//           instanceId="species-select"
//           options={speciesOptions}
//           placeholder="By type"
//           value={speciesOptions.find((o) => o.value === species) || null}
//           onChange={(option) =>
//             updateParam("species", option ? option.value : "")
//           }
//           styles={selectStyles}
//           components={{ DropdownIndicator }}
//           isSearchable={false}
//           className={css.speciesSelect}
//           classNamePrefix="species"
//         />
//       )}
//       {/* Location */}
//       {isClient && (
//         <Select
//           instanceId="cities-select"
//           placeholder="Location"
//           isClearable
//           isLoading={isLoading}
//           options={cities}
//           value={cities.find((c) => c.value === location) ?? null}
//           onInputChange={(value) => {
//             if (value.length >= 2) fetchCities(value);
//           }}
//           onChange={(option) =>
//             updateParam("location", option ? option.value : "")
//           }
//           className={css.locationSelect}
//           classNamePrefix="location"
//           styles={citySelectStyles}
//           components={{
//             Control: ControlWithSearchIcon,
//             IndicatorSeparator: () => null,
//             ClearIndicator: () => null,
//           }}
//           isSearchable
//         />
//       )}
//       <div className={css.divider} />
//       {/* Sort */}
//       <div className={css.sortContainer}>
//         <label className={css.sortButton}>
//           <input
//             type="radio"
//             name="sort"
//             value="popularity"
//             checked={sort === "popularity"}
//             onChange={(e) => updateParam("sort", e.target.value)}
//             className={css.sortRadio}
//           />
//           Popular
//         </label>
//         <label className={css.sortButton}>
//           <input
//             type="radio"
//             name="sort"
//             value="popularity"
//             checked={sort === "popularity"}
//             onChange={(e) => updateParam("sort", e.target.value)}
//             className={css.sortRadio}
//           />
//           Unpopular
//         </label>

//         <label className={css.sortButton}>
//           <input
//             type="radio"
//             name="sort"
//             value="price"
//             checked={sort === "price"}
//             onChange={(e) => updateParam("sort", e.target.value)}
//             className={css.sortRadio}
//           />
//           Cheap
//         </label>
//         <label className={css.sortButton}>
//           <input
//             type="radio"
//             name="sort"
//             value="price"
//             checked={sort === "price"}
//             onChange={(e) => updateParam("sort", e.target.value)}
//             className={css.sortRadio}
//           />
//           Expensive
//         </label>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Select, {
  components,
  type ControlProps,
  type DropdownIndicatorProps,
  type StylesConfig,
} from "react-select";
import Image from "next/image";

import SearchField from "../SearchField/SearchField";
import {
  getCategoriesClient,
  getSexesClient,
  getSpeciesClient,
  getCities,
  type City,
} from "@/app/lib/api";

import css from "./NoticesFilters.module.css";

type Props = {
  basePath?: string;
};

type Option = {
  value: string;
  label: string;
};

export default function NoticesFilters({ basePath = "/notices" }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") ?? "";

  const query = searchParams.get("query") ?? "";
  const category = searchParams.get("category") ?? "";
  const sex = searchParams.get("sex") ?? "";
  const species = searchParams.get("species") ?? "";
  const locationId = searchParams.get("locationId") ?? "";

  const [queryValue, setQueryValue] = useState(query);

  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);
  const [sexOptions, setSexOptions] = useState<Option[]>([]);
  const [speciesOptions, setSpeciesOptions] = useState<Option[]>([]);

  const [cities, setCities] = useState<Option[]>([]);
  const [isCitiesLoading, setIsCitiesLoading] = useState(false);

  const sortOptions = [
    { label: "Popular", value: "popular" },
    { label: "Unpopular", value: "unpopular" },
    { label: "Cheap", value: "cheap" },
    { label: "Expensive", value: "expensive" },
  ] as const;

  useEffect(() => {
    const run = async () => {
      try {
        const [categories, sexes, species] = await Promise.all([
          getCategoriesClient(),
          getSexesClient(),
          getSpeciesClient(),
        ]);

        setCategoryOptions(
          categories.map((v: string) => ({ value: v, label: capitalize(v) })),
        );
        setSexOptions(
          sexes.map((v: string) => ({ value: v, label: capitalize(v) })),
        );
        setSpeciesOptions(
          species.map((v: string) => ({ value: v, label: capitalize(v) })),
        );
      } catch (e) {
        console.error(e);
      }
    };

    run();
  }, []);

  useEffect(() => {
    setQueryValue(query);
  }, [query]);

  const updateParams = (patch: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    Object.entries(patch).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    router.replace(`${basePath}?${params.toString()}`);
  };

  const handleSearchSubmit = () => {
    updateParams({ query: queryValue.trim() });
  };

  const handleSearchClear = () => {
    setQueryValue("");
    updateParams({ query: "" });
  };

  const handleCitiesInput = async (value: string) => {
    setIsCitiesLoading(true);
    try {
      const data: City[] = await getCities(value.trim());
      setCities(
        data.map((c) => ({
          value: c._id,
          label: `${c.cityEn}, ${c.countyEn}, ${c.stateEn}`,
        })),
      );
    } finally {
      setIsCitiesLoading(false);
    }
  };

  const DropdownIndicator = (props: DropdownIndicatorProps<Option, false>) => (
    <components.DropdownIndicator {...props}>
      <Image src="/chevron-down.svg" width={18} height={18} alt="chevron" />
    </components.DropdownIndicator>
  );

  const ControlWithSearchIcon = (props: ControlProps<Option, false>) => (
    <components.Control {...props}>
      <Image src="/search.svg" alt="search" width={16} height={16} />
      {props.children}
    </components.Control>
  );

  const selectStyles: StylesConfig<Option, false> = {
    control: (base) => ({
      ...base,
      backgroundColor: "var(--white-color)",
      border: "none",
      borderRadius: 30,
      boxShadow: "none",
      minHeight: 48,
      padding: "0 8px",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    menu: (base) => ({ ...base, borderRadius: 15 }),
  };

  const citySelectStyles: StylesConfig<Option, false> = {
    ...selectStyles,
    control: (base) => ({
      ...selectStyles.control!(base, {} as never),
      ...base,
      width: "100%",
      flexDirection: "row-reverse",
      cursor: "text",
    }),
  };

  return (
    <div className={css.noticesFilters}>
      <div className={css.noticesSearchFieldWrapp}>
        <SearchField
          value={queryValue}
          onChangeAction={setQueryValue}
          onSubmitAction={handleSearchSubmit}
          onClearAction={handleSearchClear}
          placeholder="Search"
          className={css.noticesSearchField}
        />
      </div>

      <div className={css.categorySexSelectsWrapper}>
        <Select
          instanceId="category-select"
          options={categoryOptions}
          placeholder="Category"
          value={categoryOptions.find((o) => o.value === category) || null}
          onChange={(o) => updateParams({ category: o?.value ?? "" })}
          styles={selectStyles}
          components={{ DropdownIndicator }}
          isSearchable={false}
        />

        <Select
          instanceId="sex-select"
          options={sexOptions}
          placeholder="By gender"
          value={sexOptions.find((o) => o.value === sex) || null}
          onChange={(o) => updateParams({ sex: o?.value ?? "" })}
          styles={selectStyles}
          components={{ DropdownIndicator }}
          isSearchable={false}
        />
      </div>

      <Select
        instanceId="species-select"
        options={speciesOptions}
        placeholder="By type"
        value={speciesOptions.find((o) => o.value === species) || null}
        onChange={(o) => updateParams({ species: o?.value ?? "" })}
        styles={selectStyles}
        components={{ DropdownIndicator }}
        isSearchable={false}
      />

      <Select
        instanceId="city-select"
        placeholder="Location"
        isClearable
        isLoading={isCitiesLoading}
        options={cities}
        value={cities.find((c) => c.value === locationId) ?? null}
        onInputChange={(value, meta) => {
          if (meta.action === "input-change" && value.trim().length >= 2) {
            void handleCitiesInput(value);
          }
          return value; // важно: вернуть строку
        }}
        onChange={(o) => updateParams({ locationId: o?.value ?? "" })}
        styles={citySelectStyles}
        components={{
          Control: ControlWithSearchIcon,
          IndicatorSeparator: () => null,
        }}
        isSearchable
      />

      <div className={css.sortContainer}>
        {sortOptions.map((s) => (
          <label key={s.value} className={css.sortButton}>
            <input
              type="radio"
              name="sort"
              checked={sort === s.value}
              onChange={() => updateParams({ sort: s.value })}
              className={css.sortRadio}
            />
            {s.label}
          </label>
        ))}
      </div>

      <button
        type="button"
        className={css.resetBtn}
        onClick={() => router.replace(basePath)}
      >
        Reset
      </button>
    </div>
  );
}

function capitalize(v: string) {
  return v.charAt(0).toUpperCase() + v.slice(1);
}
