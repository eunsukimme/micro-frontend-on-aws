import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  borderBottom: "1px solid lightgray",
});

export const wrapper = style({
  maxWidth: "1200px",
  padding: "20px 0",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const title = style({
  fontSize: "32px",
  fontWeight: "bold",
});

export const github = style({
  textDecoration: "none",
});
