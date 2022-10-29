using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GameBuster.DBContext;
using GameBuster.Models;
using AutoMapper;
using GameBuster.DTOs;
using Microsoft.AspNetCore.Mvc.Rendering;
using NuGet.Protocol.Core.Types;

namespace GameBuster.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        public CustomersController(AppDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerDTO>>> GetCustomers()
        {
            var results = await _context.Customers.ToListAsync();
            return Ok(_mapper.Map<List<CustomerDTO>>(results));
        }

        // GET: api/Customers/GetFrecuentCustomer
        [HttpGet("GetFrecuentCustomer")]
        public async Task<ActionResult<CustomerDTO>> GetFrecuentCustomer()
        {

            var frecuentCustomer = await _context.Rents.GroupBy(c => c.CustomerId, (x, y) => new
            {
                quantity = y.Count(),
                customer_id = x,
            }).OrderByDescending(a => a.quantity).FirstOrDefaultAsync();

            if (frecuentCustomer == null)
            {
                return NotFound();
            }

            var client = await _context.Customers.FindAsync(frecuentCustomer.customer_id);

            return Ok(_mapper.Map<CustomerDTO>(client));
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDTO>> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<CustomerDTO>(customer));
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, CustomerDTO newCustomer)
        {
            var customer = _mapper.Map<Customer>(newCustomer);

            if (id != customer.CustomerId)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }



        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CustomerDTO>> PostCustomer(CustomerDTO newCustomer)
        {
            var customer = _mapper.Map<Customer>(newCustomer);
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            newCustomer.CustomerId = customer.CustomerId;

            return CreatedAtAction("GetCustomer", new { id = customer.CustomerId }, customer);
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.CustomerId == id);
        }

       
    }
    
}
