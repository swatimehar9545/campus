package com.aiwebsitebuilder.repository;

import com.aiwebsitebuilder.entity.HospitalBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitalBookingRepository extends JpaRepository<HospitalBooking, Long> {
}
