package com.aiwebsitebuilder.controller;

import com.aiwebsitebuilder.entity.HospitalBooking;
import com.aiwebsitebuilder.repository.HospitalBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/hospital/bookings")
@CrossOrigin(origins = "*")
public class HospitalBookingController {

    @Autowired
    private HospitalBookingRepository bookingRepository;

    @PostMapping
    public ResponseEntity<HospitalBooking> createBooking(@RequestBody HospitalBooking booking) {
        HospitalBooking saved = bookingRepository.save(booking);
        return ResponseEntity.ok(saved);
    }
    
    @GetMapping
    public ResponseEntity<List<HospitalBooking>> getAllBookings() {
        return ResponseEntity.ok(bookingRepository.findAll());
    }
}
