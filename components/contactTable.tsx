/* eslint-disable prettier/prettier */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";

export const ContactTable = () => {
  return (
    <Table aria-label="Company Details Table" selectionMode="single" className="py-3">
      <TableHeader>
        <TableColumn className="text-xl font-bold">Detail</TableColumn>
        <TableColumn className="text-xl font-bold">Information</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>
            <strong>Company Name:</strong>
          </TableCell>
          <TableCell>Aman Enterprises</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>
            <strong>Owner Name:</strong>
          </TableCell>
          <TableCell>Kuldeep Gupta</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>
            <strong>Address:</strong>
          </TableCell>
          <TableCell>
            G-211, UPSIDC Industrial Area Phase-1 M. G. Road, Dholana, GHAZIABAD
            -201015, UP
          </TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>
            <strong>Phone Number:</strong>
          </TableCell>
          <TableCell>9868151526, 9811365888</TableCell>
        </TableRow>
        <TableRow key="5">
          <TableCell>
            <strong>Email:</strong>
          </TableCell>
          <TableCell>info@oxabags.com</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
