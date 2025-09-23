import React from "react";
import {
  Container,
  Typography,
  Button,
  Stack,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import SavingsIcon from "@mui/icons-material/Savings";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Housing", value: 400 },
  { name: "Food", value: 300 },
  { name: "Transport", value: 200 },
  { name: "Entertainment", value: 100 },
];
const COLORS = ["#9c27b0", "#7b1fa2", "#ce93d8", "#ab47bc"];

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 12 }}>
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Take Control of Your Finances
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          paragraph
          sx={{ maxWidth: "700px", margin: "auto" }}
        >
          Your foundation for secure, intelligent financial management.
          Effortlessly track your income and expenses to achieve your
          financial goals.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "8px",
              textTransform: "none",
              backgroundColor: "#9c27b0",
              "&:hover": { backgroundColor: "#7b1fa2" },
            }}
          >
            Start Tracking for Free
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            sx={{ px: 4, py: 1.5, borderRadius: "8px", textTransform: "none" }}
          >
            Learn More →
          </Button>
        </Stack>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Why Choose Budget Planner?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Box p={4} boxShadow={3} borderRadius={3} textAlign="center">
              <BarChartIcon sx={{ fontSize: 50, color: "#9c27b0" }} />
              <Typography variant="h6" fontWeight="bold" mt={2}>
                Track Expenses
              </Typography>
              <Typography color="text.secondary" mt={1}>
                Categorize and monitor your daily spending with ease.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box p={4} boxShadow={3} borderRadius={3} textAlign="center">
              <AccountBalanceWalletIcon sx={{ fontSize: 50, color: "#9c27b0" }} />
              <Typography variant="h6" fontWeight="bold" mt={2}>
                Manage Income
              </Typography>
              <Typography color="text.secondary" mt={1}>
                Record multiple income sources to understand your cash flow.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box p={4} boxShadow={3} borderRadius={3} textAlign="center">
              <SavingsIcon sx={{ fontSize: 50, color: "#9c27b0" }} />
              <Typography variant="h6" fontWeight="bold" mt={2}>
                Save Smarter
              </Typography>
              <Typography color="text.secondary" mt={1}>
                Set savings goals and track your progress toward achieving them.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Insights / Chart Preview */}
      <Container maxWidth="md" sx={{ mt: 15, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Visualize Your Spending
        </Typography>
        <Typography color="text.secondary" paragraph>
          See where your money goes with easy-to-understand charts.
        </Typography>
        <Box sx={{ height: 300, mt: 4 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Container>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ mt: 15, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          What Our Users Say
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Box p={4} boxShadow={2} borderRadius={3}>
              <Typography variant="body1">
                “This app helped me cut my expenses by 30%! Highly recommended.”
              </Typography>
              <Typography fontWeight="bold" mt={2}>
                — Alex R.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box p={4} boxShadow={2} borderRadius={3}>
              <Typography variant="body1">
                “Finally achieved my savings goal. The charts are so helpful.”
              </Typography>
              <Typography fontWeight="bold" mt={2}>
                — Priya S.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action */}
      <Container maxWidth="md" sx={{ mt: 15, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Ready to Take Control?
        </Typography>
        <Typography color="text.secondary" paragraph>
          Join thousands of users who already manage their money smarter.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            px: 5,
            py: 1.5,
            borderRadius: "8px",
            backgroundColor: "#9c27b0",
            "&:hover": { backgroundColor: "#7b1fa2" },
          }}
        >
          Get Started Today
        </Button>
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#2e004f", color: "#fff", mt: 15, py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="bold">
                Budget Planner
              </Typography>
              <Typography color="gray" mt={1}>
                Secure, smart, and simple financial management.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="bold">
                Quick Links
              </Typography>
              <Typography mt={1}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                  Home
                </Link>
              </Typography>
              <Typography mt={1}>
                <Link
                  to="/expenses"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Expenses
                </Link>
              </Typography>
              <Typography mt={1}>
                <Link
                  to="/income"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Income
                </Link>
              </Typography>
              <Typography mt={1}>
                <Link
                  to="/savings"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Savings
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="bold">
                Contact
              </Typography>
              <Typography mt={1}>support@budgetplanner.com</Typography>
              <Typography mt={1}>+91 98765 43210</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />
          <Typography textAlign="center" color="gray">
            © {new Date().getFullYear()} Budget Planner. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Home;